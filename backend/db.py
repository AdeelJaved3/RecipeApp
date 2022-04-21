import mysql.connector

class Database:
    def __init__(self, host, user, password, database):
        self.host=host
        self.user=user
        self.password=password
        self.database=database

        self.mydb = mysql.connector.connect(
            host=self.host,
            user=self.user,
            password=self.password,
            database=self.database
        )

        self.mycursor = self.mydb.cursor(dictionary=True)
        #self.mycursor.execute("SELECT * FROM test")
        #myresult = self.mycursor.fetchall()
        # for x in myresult:
        #     print(x)


    def selectAll(self):
        self.mycursor.execute('SELECT * FROM recipes')
        data = self.mycursor.fetchall()
        return data

    def addRecipe(self, recipename, ingredients, instructions, servingSize, category, notes):
        query ="INSERT INTO recipes(recipename, ingredients, instructions, servingsize, category, notes) VALUES(%s, %s, %s, %s, %s, %s)",((recipename, ingredients, instructions, servingSize, category, notes),)

        self.mycursor.executemany(*query)
        self.mydb.commit()


    def editRecipe(self, recipename, ingredients, instructions, servingSize, category, notes, oldRecipeName):
        query =  "UPDATE recipes SET recipename = %s, ingredients = %s, instructions = %s, servingsize = %s, category = %s, notes = %s WHERE recipename = %s", ((recipename, ingredients, instructions, servingSize, category, notes, oldRecipeName),)

        self.mycursor.executemany(*query)
        self.mydb.commit()

    def deleteRecipe(self,id):
        self.mycursor.execute("DELETE FROM recipes WHERE id = %s", (id,))
        self.mydb.commit()


