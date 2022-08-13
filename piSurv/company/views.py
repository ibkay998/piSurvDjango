from logging import raiseExceptions
from django.shortcuts import render, redirect
from django.contrib.auth.models import User, auth
from django.contrib.auth import logout
from django.contrib.auth.decorators import login_required

from .serializers import (
    ChoiceSerializer,
    ProfileSerializers,
    QuestionsSerializer,
    SubmittedQuestionSerializer,
    TestModelSerializer,
    SurveySerializer,
    UserSerializer,
    SurveyHistorySerializer,
    AnswerSerializer,
    CompanyUserSerializer,
)
from .models import Choice, Profile, Question, TestModel, Survey,Answer,SurveyHistory
from rest_framework.permissions import (
    IsAuthenticated,
    IsAuthenticatedOrReadOnly,
    IsAdminUser,
    BasePermission,
    SAFE_METHODS
)
from django.http import JsonResponse, HttpResponse
from rest_framework import status
from rest_framework.decorators import APIView, api_view, action
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import mixins
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication



from rest_framework.authtoken.views import ObtainAuthToken
from rest_framework.authtoken.models import Token


class CustomAuthToken(ObtainAuthToken):
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data,
                                           context={'request': request})
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        token, created = Token.objects.get_or_create(user=user)
        return Response({
            'token': token.key,
            'user_id': user.pk,
            'email': user.email,
            'isStaff':user.is_staff
        })


class IsStaffPermission(BasePermission):

    def has_object_permission(self, request, view,obj):
        if request.method in SAFE_METHODS:
            return True
        return obj.is_staff == True


class SubmittedDataViewset(viewsets.ModelViewSet):
    # permission_classes = [IsAuthenticatedOrReadOnly]
    # permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)
    queryset = Survey.objects.all()
    serializer_class = SubmittedQuestionSerializer

    def perform_create(self, serializer):
        user = self.request.user
        survey = "check"
        serializer.save(user=user)
        # survey_object = Survey.objects.get(title=survey)
        # serializer.save(user=user)
        # serializer.save(survey=survey_object)


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer


class CompanyUserViewSet(viewsets.ModelViewSet,IsStaffPermission):
    queryset = User.objects.filter(is_staff=True)
    serializer_class= CompanyUserSerializer
    permission_classes = [IsStaffPermission]


class SurveyList(viewsets.ModelViewSet):
    serializer_class = SurveySerializer

    def perform_create(self, serializer):
        user = self.request.user
        serializer.save(user=user)

    def get_queryset(self):
        user = User.objects.get(username=self.request.user.username)
        survey = Survey.objects.filter(user=user)
        return survey


class QuestionList(viewsets.ModelViewSet):

    queryset = Question.objects.all()
    serializer_class = QuestionsSerializer

    def perform_create(self, serializer):
        user = User.objects.get(username="test1")
        survey = Survey.objects.get(user=user, title="test1")
        serializer.save(survey=survey)


def logout_view(request):
    logout(request)


# @login_required(login_url='login')
# def add_history(request):
#     user=request.user.username
    
#     survey = SurveySerializer.objects.get(id=survey_id)
#     history = SurveySerializer.objects.filter(survey_id= survey_,user=user).first()
#     if like_filter == None:
#         new_like = LikePost.objects.create(post_id=post_id,username=username)
#         new_like.save()
#         post.no_of_likes +=1
#         post.save()
#         return redirect('/')
#     else:
#         like_filter.delete()
#         post.no_of_likes -= 1
#         post.save()
#         return redirect('/')

class QuestionOne(APIView):
    def get(self, request, id):
        question = Question.objects.get(id_user=id)
        serializer = QuestionsSerializer(question, many=False)
        return Response(serializer.data)


# Create your views here.

# This would be all my implementation. Would be ignoring your sfor now.

# use the simplest viewset for now and forget about model viewset till you understand
# python class inheritance


class CompanySurveyList(viewsets.ViewSet,IsStaffPermission):
    permission_classes = [IsAuthenticatedOrReadOnly,IsStaffPermission]
    authentication_classes = (TokenAuthentication,)


    def list(self, request):
        queryset = Survey.objects.filter(user=request.user)
        serializer = SurveySerializer(queryset, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Survey.objects.filter(user=request.user)
        survey_instance = Survey.objects.get(pk=pk)
        serializer = SurveySerializer(survey_instance)
        return Response(serializer.data)

    def create(self, request):
        """This is the function responsible for creating a survey"""
        serializer = SurveySerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = self.request.user
        serializer.save(user=user)
        headers = {}
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

class HistoryList(viewsets.ViewSet):
    authentication_classes = (TokenAuthentication,)

    def list(self,request):
        user = self.request.user
        queryset = SurveyHistory.objects.filter(user=user.username)
        survey_list=set()
        for item in queryset:
            survey_list.add(Survey.objects.get(id= item.survey_id))
        serializer = SurveySerializer(survey_list,many=True)
        return Response(serializer.data)

    def create(self,request):
        user = self.request.user
        
        serializer = SurveyHistorySerializer()
        serializer.is_valid(raise_exception=True)
        



class AvailableSurveyList(viewsets.ViewSet):
    permission_classes = [IsAuthenticatedOrReadOnly]
    authentication_classes = (TokenAuthentication,)
    

    def list(self, request):
        user = self.request.user
        queryset = SurveyHistory.objects.filter(user=user.username)
        querysetSurvey = Survey.objects.all()
        for item in queryset:
            querysetSurvey = querysetSurvey.exclude(id=item.survey_id)
        serializer = SurveySerializer(querysetSurvey, many=True)
        return Response(serializer.data)

    def retrieve(self, request, pk=None):
        queryset = Survey.objects.all()
        survey_instance = Survey.objects.get(pk=pk)
        serializer = SurveySerializer(survey_instance)
        return Response(serializer.data)


    def create(self, request):
        """This is the function responsible for creating a survey"""
        serializer = SurveySerializer(data=request.data)
        print(request.data)
        serializer.is_valid(raise_exception=True)
        user = self.request.user
        serializer.save(user=user)
        headers = {}
        return Response(
            serializer.data, status=status.HTTP_201_CREATED, headers=headers
        )

    # the url to access this route is /<survery_id>/submit_answers
    @action(detail=True, methods=["post"])
    def submit_answers(self, request, pk=None):
        survey_instance = Survey.objects.get(pk=pk)
        id = survey_instance.id
        question = Question.objects.filter(survey=survey_instance)
        question_list =[]
        user = self.request.user
        submitted_answers = AnswerSerializer(data=request.data)
        submitted_answers.is_valid(raise_exception=True)
        print(submitted_answers.data)
        for i in range(len(question)):
            
            question[i].answer = submitted_answers.data["answer"][i]["answer"]
            question[i].save()
        
        history = SurveyHistory.objects.create(survey_id=id,user=user.username)
        history.save()
        serialized = SurveyHistorySerializer(history)
        return Response(serialized.data, status=status.HTTP_201_CREATED, headers={})

    @action(detail=True, methods=["get"])
    def submitted_answers(self, request, pk=None):
        survey_instance = Survey.objects.get(pk=pk)
        user = self.request.user
        result = survey_instance.answers().filter(user=user)
        serialized = ChoiceSerializer(result, many=True)
        return Response(serialized.data, status=status.HTTP_201_CREATED, headers={})
