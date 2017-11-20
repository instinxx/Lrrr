from django.conf.urls import url

from . import views

urlpatterns = [

    url(r'creds/$', views.CredView.as_view(), name="creds-view" ),
]
