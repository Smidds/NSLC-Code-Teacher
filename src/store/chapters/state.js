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
        instructions: `Use the <code class="prettyprint lang-cpp">#define</code> keyword to create a new macro, which works like a variable, but doesn't use any computer memory to store as it will be replaced when we compile the code. Wherever the compiler sees the macro name, it will just replace the name with the value we specified here. We will be creating the following macros: <ul><li><code class="prettyprint lang-cpp">EMG</code> - Used to rename the Red/White/Black cables as "EMG" to make the code easier to read.</li><li><code class="prettyprint lang-cpp">Degree_Stop_1</code> - Our "closed" degree to stop at, 110 degrees.</li><li><code class="prettyprint lang-cpp">Degree_Stop_2</code> - Our "open" degree to stop at, 70 degrees.</li><li><code class="prettyprint lang-cpp">Close_Threshold</code> - Value that EMG must be above in order to move the gripper to Degree_Stop_1.</li></ul>`,
        code: `#define MACRO_NAME value
// An Example
#define TEST_VALUE 10`
      },
      {
        title: 'Declare Global Variables',
        instructions: `In order to store and reuse values in our program, we will define the following variables for the following uses: <ul><li><code class="prettyprint lang-cpp">reading</code> - Defined as an integer array, the variable <code class="prettyprint lang-cpp">reading</code> will be a list that can holding 10 integer readings, which we will read and write to in a later step.</li><li><code class="prettyprint lang-cpp">finalReading</code></li><li><code class="prettyprint lang-cpp">GripPin</code> - An integer with a default value set to 9 to represent our usage of the number 9 pin to transmit integers.</li><li><code class="prettyprint lang-cpp">UpdateTime</code> - The number of milliseconds between updating servo position. A constant integer value that can never be changed within the program, this value will prevent motor burn out.</li></ul>`,
        code: `int reading[10];
int finalReading;
int GripPin = 9; 
const int UpdateTime = 200;`
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
int GripPin = 9;
const int UpdateTime = 200;`
      }
    ]
  },
  {
    title: 'The Setup Function',
    pages: [
      {
        title: 'Create The Setup Function',
        instructions: 'The <code class="prettyprint lang-cpp">setup</code> function will contain all code needed to setup the Arduino, and will be called before the <code class="prettyprint lang-cpp">loop</code> function, which we will define later. <br /><br />To begin the setup function, we will open up the serial monitor at 96 BPS with the line <code class="prettyprint lang-cpp">Serial.begin(9600);</code>. Next we will instatiate the Servo variable we declared earlier with the line <code class="prettyprint lang-cpp">ServoGripper.attach(GripPin);</code>. This function call will create a new Servo for us, attached at the given pin (<code class="prettyprint lang-cpp">GripPin = 9</code>, defined earlier), which we will use later.',
        code: `void setup(){
  Serial.begin(9600);
  ServoGripper.attach(GripPin);
}`
      }
    ]
  },
  {
    title: 'The Loop Function',
    pages: [
      {
        title: 'Declaring the Loop Function',
        instructions: 'The <code class="prettyprint lang-cpp">loop()</code> function is the main loop in the Arduino runtime. After performing the setup in the <code class="prettyprint lang-cpp">setup()</code> function, program execution starts in the <code class="prettyprint lang-cpp">loop()</code> function. The <code class="prettyprint lang-cpp">loop()</code> function will execute, and on completion will run again. We will set a 1000 MS delay (<code class="prettyprint lang-cpp">delay(1000);</code>) at the end of the function to ensure a 1 second wait time before repeating.<br /><br />We will populate the commented code regions in the next steps.',
        code: `void loop() {
  // Obtain Ten Readings

  // Determine Final Reading

  // Write Degree Stop

  // Print Debugging Value

  delay(1000);
}`
      },
      {
        title: 'Obtain Ten Readings',
        instructions: 'In order to determine the current value of the Servo, we will take 10 readings and determine a final reading in the next step. To take 10 readings, we will make use of the <code class="prettyprint lang-cpp">for( ... ) { ... }</code> loop statement, which will start with the variable <code class="prettyprint lang-cpp">i = 0</code>, and will execute the loop body until <code class="prettyprint lang-cpp">i < 10 == true</code>, which is the condition of the <code class="prettyprint lang-cpp">for</code> loop. At the end of each execution of the <code class="prettyprint lang-cpp">for</code> loop, <code class="prettyprint lang-cpp">i++</code> will run, incrementing the <code class="prettyprint lang-cpp">i</code> variable by one.<br /><br />The loop body will get a value from the function <code class="prettyprint lang-cpp">analogRead(EMG)</code> and assign it to the <code class="prettyprint lang-cpp">reading</code> array at the index, which is specified by the <code class="prettyprint lang-cpp">i</code> variable defined in the <code class="prettyprint lang-cpp">for</code> loop declaration. We then delay for 2 milliseconds, and repeat.',
        code: `for(int i = 0; i < 10; i++){
  reading[i] = analogRead(EMG); 
  delay(2);
}`
      },
      {
        title: 'Determine Final Reading',
        instructions: 'In order to determine the value of <code class="prettyprint lang-cpp">finalReading</code> we need to iterate over all ten values in <code class="prettyprint lang-cpp">reading</code> and add them to <code class="prettyprint lang-cpp">finalReading</code> to get a running sum. After the loop has terminated, we take the average over all ten values.',
        code: `for(int i = 0; i < 10; i++){
  finalReading += reading[i];
}
finalReading /= 10;`
      },
      {
        title: 'Write Degree Stop',
        instructions: 'The <code class="prettyprint lang-cpp">if { ... } else { .. }</code> statement allows us to run code if the condition is true, otherwise run the <code class="prettyprint lang-cpp">else</code> statement.<br /><br />Here, our condition is <code class="prettyprint lang-cpp">finalReading >= Close_Threshold</code>, which checks our finalReading against the <code class="prettyprint lang-cpp">Close_Threshold</code> macro we defined earlier. If <code class="prettyprint lang-cpp">finalReading</code> is above the threshold, the hand is flexing and so we write <code class="prettyprint lang-cpp">Degree_Stop_1</code> to move the ServoGripper to the closed position. If <code class="prettyprint lang-cpp">finalReading</code> is below the threshold, we move to (or potentially remain at) <code class="prettyprint lang-cpp">Degree_Stop_2</code>.',
        code: `if (finalReading >= Close_Threshold) {
  ServoGripper.write (Degree_Stop_1);
} else {
  ServoGripper.write(Degree_Stop_2); 
}`
      },
      {
        title: 'Print Debugging Value',
        instructions: 'Print out the <code class="prettyprint lang-cpp">finalReading</code> value in the Serial Monitor to check the action for debugging purposes.',
        code: `Serial.print("Value = ");
Serial.println(finalReading);`
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
const int UpdateTime = 200;

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
}`
      }
    ]
  }],
  currentStep: null,
  furthestStep: null
}

export default state
