from django.db import models


class Sight(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    price = models.IntegerField(default=0)
    work_start = models.TimeField(default='08:00:00')
    work_end = models.TimeField(default='17:00:00')
    lat = models.FloatField()
    lon = models.FloatField()
    photo = models.CharField(max_length=150)
    categories = models.TextField(default={"history": 0,
                                           "war": 0,
                                           "art": 0,
                                           "religion": 0,
                                           "nature": 0,
                                           "interesting": 0,
                                           "architecture": 0})

    def __str__(self):
        return self.name
