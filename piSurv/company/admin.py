from django.contrib import admin
from .models import Profile,Question,TestModel,Survey,Choice, User,Answer,SurveyHistory

class QuestionInline(admin.TabularInline):
    model = Question
    show_change_link = True

class ChoiceInline(admin.TabularInline):
    model = Choice

class SurveyAdmin(admin.ModelAdmin):
    inlines = [
        QuestionInline
    ]

class QuestionAdmin(admin.ModelAdmin):
    inlines = [
        ChoiceInline
    ]

# class SubmissionAdmin(admin.ModelAdmin):
#     list_display =("user","survey")

admin.site.register(Profile)
admin.site.register(Survey,SurveyAdmin)
admin.site.register(TestModel)
admin.site.register(Question,QuestionAdmin)
# admin.site.register(SubmittedQuestion,SubmissionAdmin)
admin.site.register(Choice)
admin.site.register(Answer)
admin.site.register(SurveyHistory)





# Register your models here.
