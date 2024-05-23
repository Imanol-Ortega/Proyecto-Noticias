from rest_framework import serializers
from .models import noticias, grupos, usuarios, comentarios


class NoticiasSerializer(serializers.ModelSerializer):
    class Meta:
        model = noticias
        #fields = ('id','titulo','cuerpo','imagen','autor','grupo','fecha')
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