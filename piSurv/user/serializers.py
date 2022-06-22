from rest_framework import serializers
from company.models import SubmittedQuestion
from company.serializers import UserSerializer,SurveySerializer
from piSurv.company.models import Survey

class SubmittedQuestionSerializer(serializers.ModelSerializer):
    survey = serializers.PrimaryKeyRelatedField(many=False, read_only =True)
    survey = SurveySerializer(many = False)
    individual  = serializers.PrimaryKeyRelatedField(many=False, read_only =True)
    individual = UserSerializer(many = False)
    class Meta:
        model = SubmittedQuestion
        fields = ["answer"]

    def create(self,validated_data):
        user = validated_data.pop("user")
        survey = validated_data.pop("survey")
        
        submitted_data  = SubmittedQuestion.objects.create(user=user,survey=survey,**validated_data)
        return submitted_data