from django.template import RequestContext
from pooperRater.models import User
from django.shortcuts import render, render_to_response
from pooperRater.api_calls import yelp_api_call
from pooperRater.api_calls.aggregation import something

# Create your views here.
from rest_framework.generics import RetrieveAPIView, ListAPIView
from django.shortcuts import render_to_response
from django.template.context import RequestContext
from pooperRater.models import User


def home(request):
   context = RequestContext(request,
                           {'user': request.user})
   return render_to_response('home.html', context_instance=context)


def googleplace(request):
    return render(request, 'google_places_snippet.html')

def yelp_api(request):
    yelp_response = yelp_api_call.main()
    x = something(1)
    print x['quality__avg']
    data = {
        "one": "One",
        "two": "Two",
        'yelp_response': yelp_response,
        'businesses' : yelp_response[0]['businesses']
    }
    return render(request, 'yelp_api.html', data)


########################## user profiles ##########################
# @login_required
# def profile(request):
#     user_social_auth = request.user.social_auth.filter(provider='facebook').first()
#     graph = facebook.GraphAPI(user_social_auth.extra_data['access_token'])
#     profile_data = graph.get_object("me")
#     return render(request, 'profile.html', profile_data)
######################### user rest api view #######################





