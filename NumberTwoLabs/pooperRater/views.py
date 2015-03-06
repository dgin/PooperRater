from django.shortcuts import render

# Create your views here.
from pooperRater.models import Rating, Place, Comment, Restroom
from rest_framework import views, viewsets
from django.db.models import Avg
from pooperRater.serializer import RatingSerializer, PlaceSerializer, CommentSerializer, RestroomSerializer

class RatingViewSet(viewsets.ModelViewSet):
    queryset = Rating.objects.all()
    serializer_class = RatingSerializer


class PlaceViewSet(viewsets.ModelViewSet):
    queryset = Place.objects.all()
    serializer_class = PlaceSerializer
    # lookup_field = 'id'


    # air_flow_average = Rating.objects.filter(place='id').aggregate(Avg('air_flow'))
    # cleanliness_average = Rating.objects.filter(place='id').aggregate(Avg('cleanliness'))
    # available_average = Rating.objects.filter(place='id').aggregate(Avg('available'))
    # quality_average = Rating.objects.filter(place='id').aggregate(Avg('air_flow'))
    # other_average = Rating.objects.filter(place='id').aggregate(Avg('air_flow'))
    #
    # overall_average = Rating.objects.filter(place='place_id').aggregate(Avg(air_flow_average + cleanliness_average + available_average + quality_average + other_average))


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer


class RestroomViewSet(viewsets.ModelViewSet):
    queryset = Restroom.objects.all()
    serializer_class = RestroomSerializer