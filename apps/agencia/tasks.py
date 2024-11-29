from celery import shared_task

@shared_task
def every_monday_morning():
    print("This is run every Monday morning at 7:30")

@shared_task
def sumar(x, y):
    return x + y