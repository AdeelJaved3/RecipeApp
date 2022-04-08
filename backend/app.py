from crypt import methods
from flask import Flask,render_template, request, redirect, url_for
from flask import json
import mysql.connector
import re
from flask_cors import CORS

 

app = Flask(__name__)
#Allows CORS into application
CORS(app, resources={r"/*": {"origins": "*"}})

#Connection to MYSQL
mydb = mysql.connector.connect(
  host="localhost",
  user="adeel",
  password="",
  database="recipeApp"
)

print(mydb)

mycursor = mydb.cursor(dictionary=True)
mycursor.execute("SELECT * FROM test")
myresult = mycursor.fetchall()
for x in myresult:
  print(x)




#Creates route for signup page using POST request
@app.route('/signup',methods = ['POST'])
def signup():
    if 'username' in request.json and 'password' in request.json:
        username = request.json['username']
        password = request.json['password']

        mycursor.execute("SELECT * FROM user where username = %s", (username,))
        account = mycursor.fetchone()

        if account:
            msg = "account already exists"
            data = {"success": False}
        elif not re.match(r'[A-Za-z]+', username):
            msg = "Username must be characters only"
        elif not username or not password:
            msg = "Please fill out form"
        else:

            query = "INSERT INTO user (username, password) VALUES (%s, %s)", ((username, password),)
            mycursor.executemany(*query)
            msg = "Successfully created account"
            mydb.commit()
            data = {"success": True}
            
            

        response = app.response_class(
            response=json.dumps(data),
            status=200,
            mimetype='application/json'
        )
        return response

#Creates route to get all recipes from database using GET request
@app.route('/recipes', methods = ['GET'])
def recipes():
    mycursor.execute("SELECT * FROM recipes")
    data = mycursor.fetchall()

    response = app.response_class(
            response=json.dumps({"rows":data, "success": True}),
            status=200,
            mimetype='application/json'
        )
    return response



#Creates route to add a recipe into the MYSQL database using a POST request
@app.route('/addrecipe',methods=['POST'])
def addrecipe():
    print(request.json)

    recipename = request.json['recipename']
    ingredients = request.json['ingredients']
    instructions = request.json['instructions']
    servingSize = request.json['servingSize']
    category = request.json['category']
    notes = request.json['notes']

    query =  "INSERT INTO recipes(recipename, ingredients, instructions, servingsize, category, notes) VALUES(%s, %s, %s, %s, %s, %s)", ((recipename, ingredients, instructions, servingSize, category, notes),)

    msg = "Successfully inserted recipe"
    mycursor.executemany(*query)

    mydb.commit()
    data = {"success": True}
    
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

#Creates a route to edit a single recipe in the database using a POST request
@app.route('/editrecipe',methods=['POST'])
def editRecipe():
    print(request.json)
    oldRecipeName = request.json['oldRecipeName']
    recipename = request.json['recipename']
    ingredients = request.json['ingredients']
    instructions = request.json['instructions']
    servingSize = request.json['servingSize']
    category = request.json['category']
    notes = request.json['notes']

    query =  "UPDATE recipes SET recipename = %s, ingredients = %s, instructions = %s, servingsize = %s, category = %s, notes = %s WHERE recipename = %s", ((recipename, ingredients, instructions, servingSize, category, notes, oldRecipeName),)

    msg = "Successfully updated recipe"
    mycursor.executemany(*query)

    mydb.commit()
    data = {"success": True}
    
    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response

#Creates a route to delete a recipe from the database using a POST request
@app.route('/deleterecipe', methods=['POST'])
def deleteRecipe():
    print(request.json)
    id = request.json['id']
    print(id)

    msg = "Successfully deleted recipe"
    mycursor.execute("DELETE FROM recipes WHERE id = %s", (id,))

    mydb.commit()
    data = {"success": True}

    response = app.response_class(
        response=json.dumps(data),
        status=200,
        mimetype='application/json'
    )
    return response






if __name__ == '__main__':
    app.run(debug = True)
