from django.shortcuts import render,redirect
from django.contrib.auth.models import User,auth
from .serializers import ProfileSerializers,QuestionsSerializer,TestModelSerializer,SurveySerializer,UserSerializer,SubmittedQuestionSerializer
from .models import Profile,Question,TestModel,Survey,SubmittedQuestion
from rest_framework.permissions import IsAuthenticated,IsAuthenticatedOrReadOnly,IsAdminUser
from django.http import JsonResponse,HttpResponse
from rest_framework import status
from rest_framework.decorators import APIView,api_view
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import mixins
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication


class SubmittedDataViewset(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticatedOrReadOnly]
    # permission_classes = [IsAuthenticated]
    # authentication_classes = (TokenAuthentication,)
    queryset = SubmittedQuestion.objects.all()
    serializer_class = SubmittedQuestionSerializer

    def perform_create(self,serializer):
        user= self.request.user
        survey = "check"
        survey_object = Survey.objects.get(title=survey)
        serializer.save(user=user)
        serializer.save(survey=survey_object)




class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class SurveyList(viewsets.ModelViewSet):
    serializer_class = SurveySerializer

    def perform_create(self,serializer):
        user= self.request.user
        serializer.save(user=user)

    def get_queryset(self):
        user = User.objects.get(username=self.request.user.username)
        survey = Survey.objects.filter(user=user)
        return survey



class QuestionList(viewsets.ModelViewSet):

    queryset = Question.objects.all()
    serializer_class = QuestionsSerializer

    def perform_create(self,serializer):
        user = User.objects.get(username="test1")
        survey = Survey.objects.get(user=user,title="test1")
        serializer.save(survey=survey)
        


class QuestionOne(APIView):
    def get(self,request,id):
        question = Question.objects.get(id_user=id)
        serializer = QuestionsSerializer(question,many=False)
        return Response(serializer.data)



# Create your views here.
