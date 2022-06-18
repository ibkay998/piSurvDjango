from rest_framework import serializers
from .models import Profile,Question,TestModel,Survey,Choice
from django.contrib.auth.models import User,auth

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
        user = User.objects.get(username = "test1")
        print(validated_data)
        question_set_data = validated_data.pop("question_set")
        print(question_set_data)
        survey  = Survey.objects.create(user=user,**validated_data)

        for question_set in question_set_data:
            Question.objects.create(survey=survey,**question_set_data[0])
        return survey

    
