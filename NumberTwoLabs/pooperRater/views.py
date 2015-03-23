import json
from django.http import HttpResponse, JsonResponse
from django.shortcuts import render, redirect
from django.utils.datastructures import MultiValueDictKeyError
from psycopg2._psycopg import IntegrityError
from pooperRater.api_calls import yelp_business_search

from django.shortcuts import render_to_response
from django.template.context import RequestContext
from pooperRater.forms import AnonUserInfoCreationForm, ManualPlaceCreationForm
from pooperRater.models import AnonUserInfo


def places(request):
   context = RequestContext(request,
                           {'user': request.user})
   return render_to_response('places/places.html', context_instance=context)

def place(request):
   context = RequestContext(request,
                           {'user': request.user})
   return render_to_response('places/place.html', context_instance=context)

def comment(request):
   context = RequestContext(request,
                           {'user': request.user})
   return render_to_response('comments/comments.html', context_instance=context)

def vote(request):
   context = RequestContext(request,
                           {'user': request.user})
   return render_to_response('comments/vote.html', context_instance=context)

def rating(request):
   context = RequestContext(request,
                           {'user': request.user})
   return render_to_response('ratings/ratings.html', context_instance=context)

def home_page(request):
    return render(request, 'index.html')

def successful_logout(request):
    return render(request, 'registration/successful_logout.html')

def yelp_ajax(request):
    data={}
    # If user makes a search
    if request.method == "GET":
        term=request.GET['term']
        data['term'] = term

        # If user inputs an address
        # Checks whether location was input
        try:
            location = request.GET["location"]
            data['location']=location
            # Makes the api call to yelp
            yelp_response = yelp_business_search.main(term, location)
        # If user is searching by automatically generated geolocation instead
        except MultiValueDictKeyError:
            geoCoordLat = float(request.GET["geoCoordLat"])
            geoCoordLong = float(request.GET["geoCoordLong"])
            yelp_response = yelp_business_search.main(term, (geoCoordLat, geoCoordLong))

        data['yelp'] = yelp_response # Unused, but helpful for debugging
        businesses = yelp_response['businesses']
        # data['businesses'] = json.loads(businesses)
    return JsonResponse(businesses,safe=False, status=200)

def create_anon_user(request):
    data = {}

    # For first time users only
    first_login_time = str(request.user.date_joined)[:18]
    last_login_time = str(request.user.last_login)[:18]
    if first_login_time == last_login_time:
        data['welcome_message'] = "Since this is your first time, maybe you'd like to customize " \
                                  "your anonymous username. Remember: no personally identifiable " \
                                  "information!"
    if request.method == "POST":
        has_anon = AnonUserInfo.objects.filter(related_user=request.user)
        if has_anon:
            form = AnonUserInfoCreationForm(request.POST, instance=has_anon[0])
        # Want to force uniqueness: each user can only have one anon
        else:
            form = AnonUserInfoCreationForm(request.POST)
        # Creates anon user object, but doesn't save to database
        new_anon_user = form.save(commit=False)
        # Sets related user to whoever is signed in
        new_anon_user.related_user = request.user
        new_anon_user.save()
        return redirect('/places/#places/')
        # if new_anon_user.save():
        #     return HttpResponse("All went well", status=200)
        # else:
        #     return HttpResponse("Something went wrong with your submission. Please try again.", status=400)

    # If method is not post
    # Get will error out if no anon user, so use filter and return the first
    has_anon = AnonUserInfo.objects.filter(related_user=request.user)
    if has_anon:
        form = AnonUserInfoCreationForm(instance=has_anon[0])
    else:
        form = AnonUserInfoCreationForm()
    data['form'] = form
    return render(request, 'registration/create_anon_user.html', data)

def place_add(request):

    if request.method == "POST":
        form = ManualPlaceCreationForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('/places', status=201)
    else:
        form = ManualPlaceCreationForm()
    data = {
        'form': form
    }
    return render(request, 'places/place_add.html', data)

def login_redirect(request):
    # To check if first time login, compare the first and last login
    first_login_time = str(request.user.date_joined)[:18]
    last_login_time = str(request.user.last_login)[:18]
    if first_login_time == last_login_time:
        return redirect('/user/create/')
    else:
        return redirect('/places/#places/')
########################## user profiles ##########################
# @login_required
# def profile(request):
#     user_social_auth = request.user.social_auth.filter(provider='facebook').first()
#     graph = facebook.GraphAPI(user_social_auth.extra_data['access_token'])
#     profile_data = graph.get_object("me")
#     return render(request, 'profile.html', profile_data)
######################### user rest api view #######################





