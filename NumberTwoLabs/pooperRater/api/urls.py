from django.conf.urls import patterns, include, url
from pooperRater.api.views import RatingViewSet, PlaceViewSet, CommentViewSet, UserViewSet, AnonUserInfoVIewSet, VoteViewSet
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'ratings', RatingViewSet)
router.register(r'places', PlaceViewSet)
router.register(r'comments', CommentViewSet)
router.register(r'vote', VoteViewSet)
router.register(r'user', UserViewSet)
router.register(r'anon', AnonUserInfoVIewSet)

urlpatterns = patterns('',
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
)