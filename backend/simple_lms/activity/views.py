from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Activity
from course.serializers import CourseListSerializer
from course.models import Course, Lessons

from .serializers import ActivitySerializer


@api_view(['GET'])
def get_active_courses(request):
    courses = []
    activities = request.user.activities.all()

    for activity in activities:
        if activity.status == activity.STARTED and activity.course not in courses:
            courses.append(activity.course)

    serializer = CourseListSerializer(courses, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def track_started(request, course_slug, lesson_slug):
    course = Course.objects.get(slug=course_slug)
    lesson = Lessons.objects.get(slug=lesson_slug)

    if Activity.objects.filter(created_by=request.user, course=course, lesson=lesson).count() == 0:
        Activity.objects.create(course=course, lesson=lesson, created_by=request.user)

    activity = Activity.objects.get(created_by=request.user, course=course, lesson=lesson)

    serializer = ActivitySerializer(activity, many=False)

    return Response(serializer.data)


@api_view(['POST'])
def mark_as_done(request, course_slug, lesson_slug):
    course = Course.objects.get(slug=course_slug)
    lesson = Lessons.objects.get(slug=lesson_slug)

    activity = Activity.objects.get(created_by=request.user, course=course, lesson=lesson)
    activity.status = Activity.DONE
    activity.save()

    serializer = ActivitySerializer(activity)

    return Response(serializer.data)