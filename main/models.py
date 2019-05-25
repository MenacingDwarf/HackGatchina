from django.db import models

class Sight(models.Model):
    name = models.CharField(max_length=50)
    description = models.TextField()
    price = models.IntegerField()
    work_start = models.TimeField()
    work_end = models.TimeField()
    lat = models.FloatField()
    lon = models.FloatField()
    photo = models.CharField(max_length=150)
    categories = models.TextField()

    def __str__(self):
        return self.name
