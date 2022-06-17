from posixpath import basename
from django.urls import path,include

from . import views
from .views import SurveyList,SurveyLists
from rest_framework.routers import DefaultRouter


# Create a router and register our viewsets with it.
router = DefaultRouter()


router.register('survey',SurveyList,basename="survey")

urlpatterns = [
    path('', views.index, name='index'),
    path('surveys/',SurveyLists.as_view(),name='surveys'),
    path('',include(router.urls)),
]