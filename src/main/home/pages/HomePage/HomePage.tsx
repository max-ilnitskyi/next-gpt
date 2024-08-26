import React from 'react';

function test(value: string) {
  console.log('===value: ', value); // temp
}

function HomePage() {
  test(7);
  return <div className="h-full">Home page 2</div>;
}

export default HomePage;
