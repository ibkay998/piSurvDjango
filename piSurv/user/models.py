from django.db import models
from django.contrib.auth import get_user_model

User =  get_user_model()

class ProfileUser(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_imglogo = models.ImageField(upload_to = 'profile_images', default ='blank-profile-picture.png')
    country = models.CharField(max_length=200, blank=True)
    SEX_CHOICES = (
        ('F', 'Female',),
        ('M', 'Male',),
    )
    sex = models.CharField(max_length=1,choices=SEX_CHOICES)

    def __str__(self):
        return self.user.username





# Create your models here.
