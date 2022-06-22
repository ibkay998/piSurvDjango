from django.shortcuts import render,redirect
from django.contrib.auth.models import User,auth
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated,IsAuthenticatedOrReadOnly,IsAdminUser
from company.serializers import ProfileSerializers,QuestionsSerializer,TestModelSerializer,SurveySerializer,UserSerializer
from piSurv.company.models import Survey
from .serializers import SubmittedQuestionSerializer

class SubmittedDataViewset(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticatedOrReadOnly]
    # permission_classes = [IsAuthenticated]
    # authentication_classes = (TokenAuthentication,)
    queryset = Survey.objects.all()
    serializer_class = SubmittedQuestionSerializer

    def perform_create(self,serializer):
        pass
        # user= self.request.user
        # survey = self.request.POST["title"]
        # survey_object = Survey.objects.get(title=survey)
        # serializer.save(user=user)
        # serializer.save(survey=survey_object)

    def get_queryset(self):
        user = User.objects.get(username=self.request.user.username)
        survey = Survey.objects.filter(user=user)
        return survey

# Create your views here.
