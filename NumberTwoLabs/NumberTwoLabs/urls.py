from django.conf.urls import patterns, include, url
from django.contrib import admin
from pooperRater import views


urlpatterns = patterns('',
    url(r'^home/', 'pooperRater.views.home', name='home'),
    url(r'^place/', 'pooperRater.views.place', name='place'),
    url(r'^admin/', include(admin.site.urls)),


    url(r'^index/$', views.home_page, name='index'),
    url('', include('social.apps.django_app.urls', namespace='social')),
    url(r'^logout/$', 'django.contrib.auth.views.logout', {'next_page': 'successful_logout'}, name='logout'),
    url(r'^successful_logout/$', 'pooperRater.views.successful_logout', name='successful_logout'),
    url('', include('django.contrib.auth.urls', namespace='auth')),

    # url(r'^logout/$', 'pooperRater.views.home', name='logout'),
    url(r'^api/v1/', include('pooperRater.api.urls')),
    url(r'^$', views.googleplace, name='map'),
    url(r'^yelp/$', views.yelp_api, name='yelp_api'),
    url(r'^yelp/display/$', views.yelp_display, name='yelp_display'),
    url(r'^yelp/search/$', views.yelp_search, name='yelp_search')
)

