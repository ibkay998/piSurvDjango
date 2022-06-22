from rest_framework import serializers
from .models import Profile,Question,TestModel,Survey,Choice,SubmittedQuestion
from django.contrib.auth.models import User,auth
from rest_framework.authtoken.views import Token

class ProfileSerializers(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["user","company_name","company_img"]


class TestModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestModel
        fields = ["name","book"]

class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = ["id","text"]

class QuestionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ["id","name_of_question"]

class SurveySerializer(serializers.ModelSerializer):
    question_set = serializers.PrimaryKeyRelatedField(many=True, read_only =True)
    question_set = QuestionsSerializer(many = True)

    class Meta:
        model = Survey
        fields = ["id","title","question_set"]

    def create(self, validated_data):
        user = validated_data.pop("user",None)
        question_set_data = validated_data.pop("question_set")
        survey  = Survey.objects.create(user=user,**validated_data)

        for question_set in question_set_data:
            Question.objects.create(survey=survey,**question_set_data[0])
        return survey


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id","username","password"]

        extra_kwargs= {'password':{
            'write_only':True,
            'required':True
        }}

    def create(self,validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user

class SubmittedQuestionSerializer(serializers.ModelSerializer):
    survey = serializers.PrimaryKeyRelatedField(many=False, read_only =True)
    survey = SurveySerializer(many = False)
    class Meta:
        model = SubmittedQuestion
        fields = ["survey","answer"]

    def create(self,validated_data):
        user = validated_data.pop("user")
        survey = validated_data.pop("survey")
        submitted_data  = SubmittedQuestion.objects.create(user=user,survey=survey,**validated_data)
        return submitted_data
    
