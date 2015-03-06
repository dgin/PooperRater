from django.conf.urls import patterns, include, url
from django.contrib import admin
from pooperRater.views import UserList, UserDetail
from pooperRater import views


urlpatterns = patterns('',
    # Examples:
    url(r'^home/', 'pooperRater.views.home', name='home'),
    url(r'^admin/', include(admin.site.urls)),
    url('', include('social.apps.django_app.urls', namespace='social')),
    url('', include('django.contrib.auth.urls', namespace='auth')),
    url(r'^logout/$', 'pooperRater.views.home', name='logout'),
    # url(r'^logout/$', 'django.contrib.auth.views.logout', name='logout'),
    url(r'^users/$', UserList.as_view()),
    url(r'^users/(?P<pk>[0-9]+)/$', UserDetail.as_view()),
    url(r'^api/v1/', include('pooperRater.api.urls')),
    url(r'^$', views.googleplace, name='map'),
    url(r'^yelp/$', views.yelp_api, name='yelp_api')
)

