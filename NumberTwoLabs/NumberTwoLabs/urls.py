from django.conf.urls import patterns, include, url
from django.contrib import admin
from pooperRater import views
import pooperRater
from pooperRater.api.views import RatingViewSet, PlaceViewSet, CommentViewSet
from rest_framework import routers

router = routers.SimpleRouter()
router.register(r'ratings', RatingViewSet)
router.register(r'places', PlaceViewSet)
router.register(r'comments', CommentViewSet)


urlpatterns = patterns('',
    # Examples:
    # url(r'^$', 'NumberTwoLabs.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),


    url(r'^admin/', include(admin.site.urls)),
    url(r'^api/v1/', include(router.urls)),
    # url(r'^api/v1/place/(?P<id>\d+)/$', pooperRater.api.views.return_avg),

    url(r'^$', views.googleplace, name='map'),
    url(r'^yelp', views.yelp_api, name='yelp_api')

)
