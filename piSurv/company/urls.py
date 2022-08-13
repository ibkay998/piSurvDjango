from posixpath import basename
from django.urls import path, include

from . import views
from .views import (
    AvailableSurveyList,
    SurveyList,
    UserViewSet,
    SubmittedDataViewset,
    QuestionList,
    CompanySurveyList,
    logout_view,
    SurveyHistorySerializer,
    HistoryList,
    CompanyUserViewSet
)
from rest_framework.routers import DefaultRouter


# Create a router and register our viewsets with it.
router = DefaultRouter()


router.register("survey", SurveyList, basename="survey"),
router.register("register", UserViewSet)
router.register("register-company",CompanyUserViewSet)
router.register("submit", SubmittedDataViewset)
router.register("question", QuestionList)
router.register("company-list",CompanySurveyList,basename="c-survey")
router.register("available-survey", AvailableSurveyList, basename="a-survey")
router.register("history", HistoryList, basename="a-history")


urlpatterns = [
    path("company/", include(router.urls)),
    path("company/logout/",logout_view,name="logout")
]
