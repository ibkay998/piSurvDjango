from doctest import debug
from rest_framework import serializers
from .models import Profile, Question, TestModel, Survey, Choice,SurveyHistory,Answer
from django.contrib.auth.models import User, auth
from rest_framework.authtoken.views import Token


class ProfileSerializers(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ["user", "company_name", "company_img"]


class TestModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = TestModel
        fields = ["name", "book"]


class AnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Answer
        fields = ["answer"]

# class ChoiceSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Choice
#         fields = ["id","text"]


class SurveyHistorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SurveyHistory
        fields =["survey_id","user"]


class QuestionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Question
        fields = ["questionText","questionType","option","open","required"]

    def create(self, validated_data):
        survey = validated_data.pop("survey", None)
        options = validated_data["option"]
        print(validated_data)
        question = Question.objects.create(survey=survey, **validated_data)
        for item in options:
            Choice.objects.create(question=question, text=item.optionText)
        return question


class SurveySerializer(serializers.ModelSerializer):
    # question_set = serializers.PrimaryKeyRelatedField(many=True, read_only =True)
    question_set = QuestionsSerializer(many=True)

    class Meta:
        model = Survey
        fields = ["title","description","question_set"]

    def create(self, validated_data):
        user = validated_data.pop("user", None)
        question_set_data = validated_data.pop("question_set")
        if user:
            survey = Survey.objects.create(user=user, **validated_data)
            Question.objects.bulk_create([Question(survey=survey, **x) for x in question_set_data])

        # do this instead for efficiency
        
        return survey

class SurveySerializerUser(serializers.ModelSerializer):
    class Meta:
        model = Survey
        fields = ["id","title","description","question_set"]

    


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password"]

        extra_kwargs = {"password": {"write_only": True, "required": True}}

    

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        Token.objects.create(user=user)
        return user
        
class CompanyUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ["id", "username", "password","is_staff"]

        extra_kwargs = {"password": {"write_only": True, "required": True},
                        "is_staff":{"read_only":True,"required":False}}

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data,is_staff = True)
        Token.objects.create(user=user)
        return user


class ChoiceSerializer(serializers.ModelSerializer):
    # question_id = serializers.PrimaryKeyRelatedField(queryset=Question.objects.all().values_list('id'))

    class Meta:
        model = Choice
        fields = ["question", "text"]


class SubmittedQuestionSerializer(serializers.ModelSerializer):
    answers = ChoiceSerializer(many=True)

    class Meta:
        model = Survey
        fields = ["id", "title", "answers"]

    def create(self, validated_data):
        user = validated_data.pop("user")
        choices = Choice.objects.bulk_create(
            [Choice(user=user, **x) for x in validated_data["answers"]]
        )
        breakpoint()
        return choices[0].question.survey
        # submitted_data  = SubmittedQuestion.objects.create(user=user,survey=survey,**validated_data)
        return submitted_data
