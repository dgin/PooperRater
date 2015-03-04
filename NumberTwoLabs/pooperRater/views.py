from django.shortcuts import render

# Create your views here.
from pooperRater.models import Rating
from rest_framework import views
from django.db.models import Avg

class RatingView(views.ModelViewSet):
    queryset = Rating.objects.all()
    # serializer = RatingSerializer

    