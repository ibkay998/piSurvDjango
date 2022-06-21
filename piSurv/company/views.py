from django.shortcuts import render,redirect
from django.contrib.auth.models import User,auth
from .serializers import ProfileSerializers,QuestionsSerializer,TestModelSerializer,SurveySerializer,UserSerializer
from .models import Profile,Question,TestModel,Survey
from rest_framework.permissions import IsAuthenticated,IsAuthenticatedOrReadOnly,IsAdminUser
from django.http import JsonResponse,HttpResponse
from rest_framework import status
from rest_framework.decorators import APIView,api_view
from rest_framework.response import Response
from rest_framework import generics
from rest_framework import mixins
from rest_framework import viewsets
from rest_framework.authentication import TokenAuthentication



 
class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class SurveyList(viewsets.ModelViewSet):
    queryset = Survey.objects.all()
    # permission_classes = [IsAuthenticatedOrReadOnly]
    # permission_classes = [IsAuthenticated]
    authentication_classes = (TokenAuthentication,)
    serializer_class = SurveySerializer

    def perform_create(self,serializer):
        user= self.request.user
        serializer.save(user)



    


# class ProfileList(APIView):
#     def get(self,request):
#         profile = Profile.objects.all()
#         serializer = ProfileSerializers(profile,many=True)
#         return Response(serializer.data)
        
#     def post(self,request):
#         serializer = ProfileSerializers(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data,status.HTTP_201_CREATED)
#         else:
#             return Response(serializer.errors,status.HTTP_400_BAD_REQUEST)

class QuestionList(APIView):
    def get(self,request):
        question = Question.objects.all()
        serializer = QuestionsSerializer(question,many=True)
        
        return Response(serializer.data)
        

    def post(self,request):
        serializer = QuestionsSerializer(data = request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors,status.HTTP_400_BAD_REQUEST)

class QuestionOne(APIView):
    def get(self,request,id):
        question = Question.objects.get(id_user=id)
        serializer = QuestionsSerializer(question,many=False)
        return Response(serializer.data)



# Create your views here.
