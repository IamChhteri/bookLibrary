import json

from django.shortcuts import render
from django.http import HttpResponse
import io

from rest_framework.decorators import api_view
from rest_framework.parsers import JSONParser
from .models import Book
from .serializers import bookSerializer
from rest_framework.renderers import JSONRenderer
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.views import APIView


# Create your views here.


class BookStore(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        # Get Data From db
        booksList = Book.objects.all()
        serializer = bookSerializer(booksList, many=True)
        json_data = JSONRenderer().render(serializer.data)
        return HttpResponse(json_data, content_type='application/json')


class BookStoreAPI(APIView):
    authentication_classes = [TokenAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        # Get Data From db

        if request.GET.get('id') is not None:
            booksList = Book.objects.get(id=request.GET.get('id'))
            serializer = bookSerializer(booksList, many=False)
            json_data = JSONRenderer().render(serializer.data)
            return HttpResponse(json_data, content_type='application/json')

        booksList = Book.objects.all()
        serializer = bookSerializer(booksList, many=True)
        json_data = JSONRenderer().render(serializer.data)
        return HttpResponse(json_data, content_type='application/json')

    def post(self, request):

        # Check Whether Json is valid or not.
        try:
            pythonData = JSONParser().parse(request)

            # Check Whether Book is already register or not
            try:
                booksList = Book.objects.get(name=pythonData['name'])
                serializer = bookSerializer(booksList, many=False)
                if serializer.data['name'] == pythonData['name']:
                    status = {"flag": False, "reason": "Book Already exists"}
                    status = json.dumps(status)
                    return HttpResponse(status, content_type='application/JSON')

            except:
                #     Entering new book details
                bookData = bookSerializer(data=pythonData)
                if bookData.is_valid():
                    bookData.save()
                    status = {"flag": True, "reason": "Book Save Successfully"}
                    status = json.dumps(status)
                    return HttpResponse(status, content_type='application/JSON')

        except:
            status = {"flag": False, "reason": "Wrong json/type"}
            status = json.dumps(status)
            return HttpResponse(status, content_type='application/JSON')

    def put(self, request):
        try:
            bookData = JSONParser().parse(request)

            #     # Get Data From db
            booksList = Book.objects.get(id=bookData['id'])
            bookSerializerD = bookSerializer(booksList, data=bookData)
            if bookSerializerD.is_valid():
                bookSerializerD.save()
                status = {"flag": True, "reason": "Book Save Successfully"}
                status = json.dumps(status)
                return HttpResponse(status, content_type='application/JSON')

        except:

            status = {"flag": False, "reason": "Wrong json/type"}
            status = json.dumps(status)
            return HttpResponse(status, content_type='application/JSON')

    def delete(self, request):

        try:
            #     # Get Data From db
            booksList = Book.objects.get(id=request.GET.get('id'))
            booksList.delete()
            status = {"flag": True, "reason": "Book Deleted"}
            status = json.dumps(status)
            return HttpResponse(status, content_type='application/JSON')
        #
        except:

            status = {"flag": False, "reason": "Wrong json/type Delete"}
            status = json.dumps(status)
            return HttpResponse(status, content_type='application/JSON')
