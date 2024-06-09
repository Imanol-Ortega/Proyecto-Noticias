from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .serializer import NoticiasSerializer, ComentariosSerializer, GruposSerializer, UsuariosSerializer
from .models import noticias, grupos, usuarios, comentarios
from rest_framework.authtoken.models import Token

class NoticiasApi(viewsets.ModelViewSet):
    serializer_class = NoticiasSerializer
    queryset =  noticias.objects.all()

class UsuariosApi(viewsets.ModelViewSet):
    serializer_class = UsuariosSerializer
    queryset = usuarios.objects.all()

    @action(detail=False, methods=['POST'])
    def login(self,request):
        usuario = request.data.get('usuario')
        clave = request.data.get('clave')

        usuarios_filtrados = usuarios.objects.filter(usuario=usuario, clave=clave)

        if not usuarios_filtrados:
            return Response({'message':'Usuario o contraseña incorrectos'}, status=status.HTTP_404_NOT_FOUND)

        usuarios_serializer = UsuariosSerializer(usuarios_filtrados, many=True)

        return Response(usuarios_serializer.data)
        
class ComentariosApi(viewsets.ModelViewSet):
    serializer_class = ComentariosSerializer
    queryset = comentarios.objects.all()

    @action(detail=False, methods=['POST'], url_path='comentario')
    def comentarios_por_noticia(self,request ):
        noticia = request.data.get('noticiaid')
        if noticia:
            comentarios_por_noticia = comentarios.objects.filter(noticia=noticia).filter(visible=True)
            serializer = ComentariosSerializer(comentarios_por_noticia, many=True)
            return Response(serializer.data)
        else:
            return Response({"error":False})
        
    @action(detail=False, methods=['get'])
    def aprobar(self,request):
        comentario = comentarios.objects.filter(visible = False)
        serializer = ComentariosSerializer(comentario, many=True)
        return Response(serializer.data)

class GruposApi(viewsets.ModelViewSet):
    serializer_class = GruposSerializer
    queryset =  grupos.objects.all()
