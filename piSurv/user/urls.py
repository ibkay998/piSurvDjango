from posixpath import basename
from django.urls import path,include

from . import views
# from .views import SubmittedDataViewset
from rest_framework.routers import DefaultRouter


# Create a router and register our viewsets with it.
# router = DefaultRouter()


# router.register('',SubmittedDataViewset,basename="data")

# urlpatterns = [
#     path('user/',include(router.urls)),
# ]