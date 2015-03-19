from django.conf.urls import patterns, include, url
from pooperRater.api.views import RatingViewSet, PlaceViewSet, UserViewSet, AnonUserInfoViewSet, VoteViewSet, PlaceRatingViewSet
from rest_framework import routers


router = routers.DefaultRouter()
router.register(r'ratings', RatingViewSet)
router.register(r'places', PlaceViewSet)
#router.register(r'comments', CommentViewSet)
router.register(r'vote', VoteViewSet)
router.register(r'user', UserViewSet)
router.register(r'anon', AnonUserInfoViewSet)

urlpatterns = patterns('',
    url(r'^', include(router.urls)),
    url(r'^api-auth/', include('rest_framework.urls', namespace='rest_framework')),
    url(r'^places/(?P<pk>[0-9]+)/ratings/$', PlaceRatingViewSet.as_view()),
    #url(r'^ratings/(?P<pk>[0-9]+)/comments/$', RatingCommentViewSet.as_view()),
)