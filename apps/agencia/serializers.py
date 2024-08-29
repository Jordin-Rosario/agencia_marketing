from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator
from django.contrib.auth.hashers import make_password
from .models import Producto


class ProductoSerializers(serializers.ModelSerializer):
    class Meta:
        model = Producto
        fields = '__all__'