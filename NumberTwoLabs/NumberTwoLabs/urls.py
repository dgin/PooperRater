from django.conf.urls import patterns, include, url
from django.contrib import admin
from pooperRater import views


urlpatterns = patterns('',

    url(r'^places/', 'pooperRater.views.places', name='places'),
    url(r'^place/$', 'pooperRater.views.place', name='place'),
    url(r'^comment/$', 'pooperRater.views.comment', name='comment'),
    url(r'^vote/$', 'pooperRater.views.vote', name='vote'),
    url(r'^rating/', 'pooperRater.views.rating', name='rating'),
    url(r'^admin/', include(admin.site.urls)),

    url(r'^index/$', views.home_page, name='index'),
    url('', include('social.apps.django_app.urls', namespace='social')),
    url(r'^logout/$', 'django.contrib.auth.views.logout', {'next_page': 'successful_logout'}, name='logout'),
    url(r'^successful_logout/$', 'pooperRater.views.successful_logout', name='successful_logout'),
    url('', include('django.contrib.auth.urls', namespace='auth')),


    # url(r'^logout/$', 'pooperRater.views.home', name='logout'),
    # url(r'^comment/api/v1/', include('pooperRater.api.urls')),
    # url(r'^vote/api/v1/', include('pooperRater.api.urls')),
    # url(r'^rating/api/v1/', include('pooperRater.api.urls')),


    url(r'^api/v1/', include('pooperRater.api.urls')),
    url(r'^yelp/ajax/$', views.yelp_ajax, name='yelp_ajax'),
    url(r'^user/create', views.create_anon_user, name='create_anon_user'),

    url(r'place/add/$', views.place_add, name='place_add')
)

