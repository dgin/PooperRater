from django.conf.urls import patterns, include, url
from django.contrib import admin
from pooperRater.api.views import RatingViewSet, PlaceViewSet, CommentViewSet
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'ratings', RatingViewSet)
router.register(r'places', PlaceViewSet)
router.register(r'comments', CommentViewSet)


urlpatterns = patterns('',

    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
)