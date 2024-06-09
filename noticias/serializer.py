from rest_framework import serializers
from .models import noticias, grupos, usuarios, comentarios
from rest_framework.authtoken.models import Token


class NoticiasSerializer(serializers.ModelSerializer):
    class Meta:
        model = noticias
        
        fields = '__all__'

class UsuariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = usuarios
        fields = '__all__'

class ComentariosSerializer(serializers.ModelSerializer):
    class Meta:
        model = comentarios
        fields = '__all__'

class GruposSerializer(serializers.ModelSerializer):
    class Meta:
        model = grupos
        fields = '__all__'

