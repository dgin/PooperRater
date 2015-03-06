from django.conf.urls import patterns, include, url
from django.contrib import admin
from pooperRater.views import UserList, UserDetail


from django.db import router


urlpatterns = patterns('',
    # Examples:
    url(r'^home/', 'pooperRater.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^admin/', include(admin.site.urls)),
    url('', include('social.apps.django_app.urls', namespace='social')),
    url('', include('django.contrib.auth.urls', namespace='auth')),
    url(r'^logout/$', 'pooperRater.views.home', name='logout'),
    # url(r'^logout/$', 'django.contrib.auth.views.logout', name='logout'),
    url(r'^users/$', UserList.as_view()),
    url(r'^users/(?P<pk>[0-9]+)/$', UserDetail.as_view()),

)