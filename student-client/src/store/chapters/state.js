var state = {
  chapters: [{
    title: 'Declarations and Inclusions',
    pages: [
      {
        title: 'Include Servo',
        code: `#include <Servo.h>
Servo ServoGripper;`,
        instructions: 'Include the Servo library by utilizing the <code class="prettyprint lang-cpp">#include</code> keyword.This will grant us access to a list of Servo commands to tell our Servo what to do. <br /><br /> We will also declare (but not create) a Servo object called ServoGripper. We will create that new Servo later.',
        quiz: {
          questions: [
            {
              instructions: 'To include another library from a file called Math.h, what would you type?',
              correctAnswers: [
                '#include <Math.h>'
              ]
            },
            {
              instructions: 'To declare a variable called SportsCar, of object type Car, what would you type?',
              correctAnswers: [
                'Car SportsCar;',
                'Car SportsCar'
              ]
            }
          ],
          questionsAnswered: 0
        }
      },
      {
        title: 'Create Macros',
        instructions: `Use the <code class="prettyprint lang-cpp">#define</code> keyword to create a new macro, which works like a variable, but doesn't use any computer memory to store as it will be replaced when we compile the code. Wherever the compiler sees the macro name, it will just replace the name with the value we specified here. We will be creating the following macros: <ul><li><code class="prettyprint lang-cpp">EMG</code> - Used to rename the Red/White/Black cables as "EMG" to make the code easier to read.</li><li><code class="prettyprint lang-cpp">Degree_Stop_1</code> - This is the angle the motor will rotate to when the claw is closed.</li><li><code class="prettyprint lang-cpp">Degree_Stop_2</code> - This is the angle the motor will rotate to when the claw is open.</li><li><code class="prettyprint lang-cpp">Close_Threshold</code> - EMG value that must be picked up by monitor in order to close the hand, by rotating the motor to the angle specific in Degree_Stop_1.</li></ul>`,
        code: `#define Degree_Stop_1 110`,
        quiz: {
          questions: [
            {
              instructions: 'If you wanted to define Degree_Stop_1 as 120 degrees, what would you type?',
              correctAnswers: [
                '#define Degree_Stop_1 120'
              ]
            },
            {
              instructions: 'If you wanted to define Degree_Stop_2 as 70 degrees, what would you type?',
              correctAnswers: [
                '#define Degree_Stop_2 70'
              ]
            },
            {
              instructions: 'If you wanted to define Close_Threshold as 50, what would you type?',
              correctAnswers: [
                '#define Close_Threshold 50'
              ]
            },
            {
              instructions: 'Scenario: When you clench your fist and your claw closes, it does not close all the way. Which macro value would you change to fix that?',
              correctAnswers: [
                'Degree_Stop_1'
              ]
            },
            {
              instructions: 'Scenario: When you relax your arm and the claw opens, it does not open wide enough to grab the object you are trying to pick up. Which macro value would you change?',
              correctAnswers: [
                'Degree_Stop_2'
              ]
            },
            {
              instructions: 'Scenario: Even though you are clenching your fist, the claw is not closing. Which macro value would you change?',
              correctAnswers: [
                'Close_Threshold'
              ]
            },
            {
              instructions: 'If you are using grip pin 5, what would you type to declare the integer variable GripPin and set it to 5?',
              correctAnswers: [
                'int GripPin = 5;',
                'int GripPin = 5'
              ]
            }
          ],
          questionsAnswered: 0
        }
      },
      {
        title: 'Declare Global Variables',
        instructions: `In order to store and reuse values in our program, we will define the following variables for the following uses: <ul><li><code class="prettyprint lang-cpp">reading</code> - Defined as an integer array, the variable <code class="prettyprint lang-cpp">reading</code> will be a list that can holding 10 integer readings, which we will read and write to in a later step.</li><li><code class="prettyprint lang-cpp">finalReading</code></li><li><code class="prettyprint lang-cpp">GripPin</code> - An integer with default value set to 9. This corresponds with the grip pin position you will use on the Arduino.</li></ul>`,
        code: `int reading[10];
int finalReading;
int GripPin = 9;`,
        quiz: {
          questions: [
            {
              instructions: 'If you are using grip pin 5, what would you type to declare the integer variable GripPin and set it to 5?',
              correctAnswers: [
                'int GripPin = 5;',
                'int GripPin = 5'
              ]
            }
          ],
          questionsAnswered: 0
        }
      },
      {
        title: 'Summary',
        instructions: 'Here is all the code you should have completed for this section.',
        code: `#include <Servo.h> 
Servo ServoGripper;

#define EMG A0
#define Degree_Stop_1 15
#define Degree_Stop_2 80
#define Close_Threshold 50

int reading[10];
int finalReading;
int GripPin = 9;`
      }
    ]
  },
  {
    title: 'The Setup Function',
    pages: [
      {
        title: 'Create The Setup Function',
        instructions: 'The <code class="prettyprint lang-cpp">setup</code> function will contain all code needed to setup the Arduino, and will be run before the <code class="prettyprint lang-cpp">loop</code> function, which we will define later. <br /><br />The first thing we want our <code class="prettyprint lang-cpp">setup</code> function to do is open up the serial monitor at 9600 bps (bits per second) with the line <code class="prettyprint lang-cpp">Serial.begin(9600);</code>. This will allow us to send data to the computer at a rate of 9600 bps. Next we will assign a value to the <code class="prettyprint lang-cpp">Servo</code> variable we created earlier with the line <code class="prettyprint lang-cpp">ServoGripper.attach(GripPin);</code>. the code segment <code class="prettyprint lang-cpp">attach(GripPin)</code> is a call to another function like our <code class="prettyprint lang-cpp">setup</code> and will create a new <code class="prettyprint lang-cpp">Servo</code> for us, attached at the given pin that we provide between the parentheses (<code class="prettyprint lang-cpp">GripPin = 9</code>, defined earlier). We will use the new <code class="prettyprint lang-cpp">Servo</code> later in the code.',
        code: `void setup(){
  Serial.begin(9600);
  ServoGripper.attach(GripPin);
}`,
        quiz: {
          questions: [
            {
              instructions: 'In the code given, which line is responsible for creating the new Servo?',
              correctAnswers: [
                '3'
              ]
            },
            {
              instructions: 'In the code given, which line binds a new Servo to our previously defined GripPin?',
              correctAnswers: [
                '3'
              ]
            },
            {
              instructions: 'In the code given, which line sets the bps (bits per second) rate to send data to the computer?',
              correctAnswers: [
                '2'
              ]
            },
            {
              instructions: 'If we had a new variable called NewGripPin and wanted to attach ServoGripper to that NewGripPin value instead of GripPin, what would you type?',
              correctAnswers: [
                'ServoGripper.attach(NewGripPin);',
                'ServoGripper.attach(NewGripPin)'
              ]
            }
          ],
          questionsAnswered: 0
        }
      }
    ]
  },
  {
    title: 'The Loop Function',
    pages: [
      {
        title: 'Declaring the Loop Function',
        instructions: 'The <code class="prettyprint lang-cpp">loop</code> function is the main function where are the important work is done. After setting up in the previous <code class="prettyprint lang-cpp">setup</code> function, Arduino will call the <code class="prettyprint lang-cpp">loop</code> function, and once it\'s done running it will run again forever until stopped. We will set a 1000 millisecond delay (<code class="prettyprint lang-cpp">delay(1000);</code>) at the end of the function to make sure we wait a second before we run the function again.<br /><br />We will fill out the commented code regions (The lines start with //) in the next steps. The comments are just meant to give you a general idea of where everything will fit once complete.',
        code: `void loop() {
  // Obtain Ten Readings

  // Determine Final Reading

  // Write Degree Stop

  // Print Debugging Value

  delay(1000);
}`,
        quiz: {
          questions: [
            {
              instructions: 'If you wanted a delay time of 2 seconds, how would you write line 10 from the code excerpt shown above?',
              correctAnswers: [
                'delay(2000);',
                'delay(2000)'
              ]
            },
            {
              instructions: 'Scenario: When you close your fist, you notice a bit of lag before the claw closes. Would you increase or decrease the delay to fix this?',
              correctAnswers: [
                'Decrease',
                'decrease'
              ]
            }
          ],
          questionsAnswered: 0
        }
      },
      {
        title: 'Obtain Ten Readings',
        instructions: 'In order for us to determine what degree our servo is currently at we are going to take several readings to improve accuracy. We will make use of the variable we previously created <code class="prettyprint lang-cpp">reading[10]</code>. <br /> <br />To take the 10 readings, we will make use of the <code class="prettyprint lang-cpp">for( ... ) { ... }</code> loop statement, which translates in plain English to "start at <code class="prettyprint lang-cpp">i = 0</code>, and until <code class="prettyprint lang-cpp">i</code> is equal to <code class="prettyprint lang-cpp">10</code> (<code class="prettyprint lang-cpp">i < 10</code>) run the code inside the <code class="prettyprint lang-cpp">{ ... }</code> and add one to <code class="prettyprint lang-cpp">i</code> (<code class="prettyprint lang-cpp">i++</code>) when finished".<br /><br />Inside the for loop, the value to put inside <code class="prettyprint lang-cpp">reading</code> will be given by <code class="prettyprint lang-cpp">analogRead(EMG)</code>, which measures the electrical output coming from the electrodes attached to your arm. We then delay 2 milliseconds before repeating the loop.',
        code: `for(int i = 0; i < 10; i++) {
  reading[i] = analogRead(EMG); 
  delay(2);
}`,
        quiz: {
          questions: [
            {
              instructions: 'If we wanted the loop to take more readings to increase the accuracy (and assuming the variable "reading" was long enough to hold them), what line would we need to modify?',
              correctAnswers: [
                '1'
              ]
            },
            {
              instructions: 'Re-write what the first line would look like if we wanted to take 20 readings instead of 10.',
              correctAnswers: [
                'for(int i = 0; i < 20; i++) {',
                'for(int i = 0; i < 20; i++){',
                'for(int i = 0; i < 20; i++)',
                'for (int i = 0; i < 20; i++) {',
                'for (int i = 0; i < 20; i++){',
                'for (int i = 0; i < 20; i++)'
              ]
            }
          ],
          questionsAnswered: 0
        }
      },
      {
        title: 'Determine Final Reading',
        instructions: 'The value of <code class="prettyprint lang-cpp">finalReading</code> is the average of all the values inside <code class="prettyprint lang-cpp">reading</code>. To get the average, we add all the values of <code class="prettyprint lang-cpp">reading</code> to <code class="prettyprint lang-cpp">finalReading</code> inside a <code class="prettyprint lang-cpp">for( ... )</code> loop, then divide the result by 10 and set <code class="prettyprint lang-cpp">finalReading</code> to that value.',
        code: `for(int i = 0; i < 10; i++){
  finalReading += reading[i];
}
finalReading /= 10;`,
        quiz: {
          questions: [
            {
              instructions: 'which two lines would you need to change if you only wanted to get the average of the first 5 readings? (ex: 2, 4)',
              correctAnswers: [
                '1, 4',
                '1 and 4',
                '1 4',
                '4, 1',
                '4 and 1',
                '4 1'
              ]
            },
            {
              instructions: 'How would you re-write the first line to only get the average of the first 5 readings?',
              correctAnswers: [
                'for(int i = 0; i < 5; i++) {',
                'for(int i = 0; i < 5; i++){',
                'for(int i = 0; i < 5; i++)',
                'for (int i = 0; i < 5; i++) {',
                'for (int i = 0; i < 5; i++){',
                'for (int i = 0; i < 5; i++)'
              ]
            },
            {
              instructions: 'Which line is responsible for adding the values of reading together?',
              correctAnswers: [
                '2'
              ]
            }
          ],
          questionsAnswered: 0
        }
      },
      {
        title: 'Write Degree Stop',
        instructions: 'The <code class="prettyprint lang-cpp">if { ... } else { .. }</code> statement allows us to run code if the condition is true, otherwise run the <code class="prettyprint lang-cpp">else</code> statement.<br /><br />Here, our condition is <code class="prettyprint lang-cpp">finalReading >= Close_Threshold</code>, which checks our <code class="prettyprint lang-cpp">finalReading</code> against the <code class="prettyprint lang-cpp">Close_Threshold</code> macro we defined earlier. If <code class="prettyprint lang-cpp">finalReading</code> is above the threshold, the hand is flexing and so we write <code class="prettyprint lang-cpp">Degree_Stop_1</code> to move the <code class="prettyprint lang-cpp">ServoGripper</code> to the closed position. If <code class="prettyprint lang-cpp">finalReading</code> is below the threshold, we move to (or potentially remain at) <code class="prettyprint lang-cpp">Degree_Stop_2</code>.',
        code: `if (finalReading >= Close_Threshold) {
  ServoGripper.write(Degree_Stop_1);
} else {
  ServoGripper.write(Degree_Stop_2); 
}`,
        quiz: {
          questions: [
            {
              instructions: 'If we wanted to change which block of code gets run, which line would need to change?',
              correctAnswers: [
                '1'
              ]
            },
            {
              instructions: 'How would we re-write the first line if we wanted the exact opposite condition to be true (less than the Close_Threshold)?',
              correctAnswers: [
                'if (finalReading < Close_Threshold) {',
                'if (finalReading < Close_Threshold){',
                'if(finalReading < Close_Threshold) {',
                'if(finalReading < Close_Threshold){'
              ]
            }
          ],
          questionsAnswered: 0
        }
      },
      {
        title: 'Print Debugging Value',
        instructions: 'Often when we program we run in to bugs or problems with our code that are difficult to reason through in our heads. To help us understand what\'s happening under the hood as our program runs, we use different kinds of debugging tools.<br /><br />One simple (and often very effective) debugging tool is a print statement. For our testing we want to print out the <code class="prettyprint lang-cpp">finalReading</code> value to the Serial Monitor to better understand what reading we think we\'re getting. We do this by typing <code class="prettyprint lang-cpp">Serial.print()</code> or <code class="prettyprint lang-cpp">Serial.println()</code> if we want a new line to be added (like hitting the "enter" key to create another line).',
        code: `Serial.print("Value = ");
Serial.println(finalReading);`,
        quiz: {
          questions: [
            {
              instructions: 'How would you print out the string "Testing!" to the Serial Monitor, followed by a new line?',
              correctAnswers: [
                'Serial.println("Testing!");',
                'Serial.println("Testing!")'
              ]
            },
            {
              instructions: 'If we had a variable called TestVariable, what two lines would you need to write to print the string "TestVariable = ", followed by the value of TestVariable and a new line?',
              correctAnswers: [
                `Serial.print("TestVariable = ");
Serial.println(TestVariable);`,
                `Serial.print("TestVariable =");
Serial.println(TestVariable);`,
                `Serial.print("TestVariable = ")
Serial.println(TestVariable)`,
                `Serial.print("TestVariable =")
Serial.println(TestVariable)`,
                `Serial.print("TestVariable = ");
Serial.println(TestVariable)`,
                `Serial.print("TestVariable =");
Serial.println(TestVariable)`,
                `Serial.print("TestVariable = ")
Serial.println(TestVariable);`,
                `Serial.print("TestVariable =")
Serial.println(TestVariable);`
              ]
            }
          ],
          questionsAnswered: 0
        }
      },
      {
        title: 'Summary',
        instructions: 'Here is all the code you should have completed for the section.',
        code: `void loop(){
  for(int i = 0; i < 10; i++){
    reading[i] = analogRead(EMG); 
    delay(2);
  }

  for(int i = 0; i < 10; i++){
    finalReading += reading[i];
  }
  finalReading /= 10;

  if (finalReading >= Close_Threshold){
    ServoGripper.write (Degree_Stop_1);
  } else {
    ServoGripper.write(Degree_Stop_2); 
  } 

  Serial.print("Value = ");
  Serial.println(finalReading);
  delay(1000);
}`
      }
    ]
  },
  {
    title: 'In Conclusion',
    pages: [
      {
        title: 'Completed Program',
        instructions: 'Here is what the final file should look like, after all steps are completed.',
        code: `#include <Servo.h>
Servo ServoGripper;

#define EMG A0
#define Degree_Stop_1 15
#define Degree_Stop_2 80
#define Close_Threshold 50

int reading[10];
int finalReading;
int GripPin = 9;

void setup(){
  Serial.begin(9600);
  ServoGripper.attach(GripPin);
}

void loop(){
  for(int i = 0; i < 10; i++){
    reading[i] = analogRead(EMG); 
    delay(2);
  }
  
  for(int i = 0; i < 10; i++){
    finalReading += reading[i];
  }
  finalReading /= 10;
  
  if (finalReading >= Close_Threshold){
    ServoGripper.write (Degree_Stop_1);
  } else {
    ServoGripper.write(Degree_Stop_2); 
  } 

  Serial.print("Value = ");
  Serial.println(finalReading);
  delay(1000);
}`,
        quiz: {
          questions: [
            {
              instructions: 'What is the name of the function that is responsible for doing all the work?',
              questionsAnswered: [
                'loop'
              ]
            },
            {
              instructions: 'How many readings does this code take in order to get an accurate average of the degree of the arm?',
              questionsAnswered: [
                '10'
              ]
            },
            {
              instructions: 'How would you change the line 37 to wait 5 seconds instead of 1?',
              questionsAnswered: [
                'delay(5000)',
                'delay(5000);'
              ]
            }
          ],
          questionsAnswered: 0
        }
      }
    ]
  }],
  currentStep: null,
  furthestStep: null
}

export default state
