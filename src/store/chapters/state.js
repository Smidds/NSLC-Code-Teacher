var state = {
  'chapters': [{
    'title': 'The Basics',
    'pages': [{
      'title': 'Classic Hello World',
      'code': `#include <iostream>
using namespace std;

int main() 
{
    cout << "Hello, World!";
    return 0;
}`,
      'instructions': 'Hello world is a <em>simple introduction</em>. To do it, <strong>just complete the code to the left!</strong>'
    }, {
      'title': 'Variables',
      'code': `int counter = 0;
String hello = "Hello World!";
bool isGitaCool = true;
Servo testServo = new Servo();`,
      'instructions': 'Variables are a fundamental pillar of programming. Listed in the code block are a few of the core types of variables, as well as an example of what\'s known as an Object, in this case called "Servo". An object is a way of describing a type of thing, like a Cat or a Dog, and making new kinds of those things is triggered with the "new" keyword, like "new Servo()", or "new Dog()". Don\'t worry if this is confusing, you just need to understand the high level of it, that\'s all!'
    }, {
      'title': 'Arithmetic Operations',
      'code': `int four = 2 + 2;
double oneHalf = 0.25 + 0.25;
int bigNumber = 1000 * 1000;
if (2 + 2 == 4) {
  printf("2 + 2 is 4! Who knew?");
}`,
      'instructions': 'In order to do any arthmetic operation, you just need to use the math operators you\'re familiar with, and optionally assign them to another variable, or use the value to perform other work such as check a value or trigger an event.'
    }, {
      'title': 'et dolorum non',
      'code': 'printf("Hello World!");',
      'instructions': 'Officia ut ea consequatur qui eius maxime. Veritatis dignissimos mollitia mollitia accusamus et. Necessitatibus sed voluptatem aperiam molestiae esse beatae odit perferendis blanditiis.\n \rSapiente corrupti non optio culpa. Repellendus magnam error minima et. Quia facilis culpa nihil quia officia sequi. Aspernatur hic ex omnis tempora est nemo ab aut porro. Quibusdam et rerum iste. Iure autem autem ut ut cum beatae officia incidunt deserunt.\n \rPraesentium nihil eveniet veritatis. Rerum vel qui voluptate recusandae. Qui et laudantium. Quia asperiores minus omnis animi autem. Sit perspiciatis eos porro porro illum porro ut atque soluta. Voluptas nam harum.'
    }, {
      'title': 'dolorem iure magnam',
      'code': 'printf("Hello World!");',
      'instructions': 'Rerum culpa minima delectus necessitatibus fugit occaecati aut omnis. Eligendi alias blanditiis et et molestiae distinctio dolorem. Minima ut laboriosam voluptatum in. Vel laudantium autem officiis iure sunt dolore debitis dolorum.\n \rSint est at. Corporis aut labore. Quis optio exercitationem aut quasi aut qui. Ad sunt similique hic nulla vero est laboriosam.\n \rVoluptatum et vero. Accusantium corporis sit aspernatur rerum iusto quam itaque delectus ratione. Tempore accusantium nobis libero odio et perspiciatis neque.'
    }]
  },
  {
    'title': 'awdad',
    'pages': [{
      'title': 'awoawmvaw',
      'code': 'printf("Hello World!");',
      'instructions': 'Voluptas facere quam nam aliquid itaque est consequatur. Autem voluptatem fugiat consequuntur velit dolor. Neque eligendi a vitae quam. Velit sit amet asperiores sit porro fuga et consequatur. Iure quidem dicta dolores et. Vel eum eligendi error nihil.\n \rNon inventore tempore repudiandae unde aliquid iure voluptatem ut. Consectetur officiis voluptatem blanditiis dignissimos. Autem fugit ut dicta hic nihil sit et. Quos debitis occaecati optio voluptatem sit error aliquid distinctio eum. Sit est quia corporis animi. Ut commodi at dolore.\n \rConsequatur optio dolorem. Dolor vitae est alias enim. Quasi eos est. Est quaerat enim est corporis quia aliquid ea. Voluptatem fugit est ex laudantium deleniti cumque. Enim qui aut ullam illum.'
    }]
  }],
  currentStep: null,
  furthestStep: null
}

export default state
