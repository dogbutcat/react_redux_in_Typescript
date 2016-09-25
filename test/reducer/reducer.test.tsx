// Basic lib
import { createStore } from 'redux';
import { expect, should } from 'chai';
import * as extend from 'extend';
import { suite, test, slow, timeout, skip, only } from 'mocha-typescript';

import {shallow, mount, render} from 'enzyme';
import * as React from 'react';
import * as jsdom from 'jsdom';
import Footer from '../../src/component/Footer';

// Test target
import { todoApp, TodoActions, VisibilityFilters } from '../../src/reducer/reducer';
import App from '../../src/app';

/**
 * Pre-ready
 */
const doc = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.document = doc;
global.window = doc.defaultView;

@suite('Mocha Typescript')
class TodoState {
    static token;
    static unsubscribe;
    store: any;
    unsubscribes: any;
    // static Means it runs before/after all tests like before
    static before() {
        this.token = createStore(todoApp); // this prefix means it work in static scope and it can be called 
        // this.unsubscribe = this.token.subscribe(()=>{
        //     console.log(this.token.getState());
        // })
    }
    static after() {
        // this.unsubscribe();
    }
    // normal method means it runs before/after each test like beforeEach
    before() {
        this.store = TodoState.token;
        this.unsubscribes = this.store.subscribe(() => {
            console.log(this.store.getState());
            console.log('------------------------------------------------------');
        })
    }
    after() {
        if (this.unsubscribes)
            this.unsubscribes()
        // console.log(this.store.getState())
        console.log('\n');
    }
    @skip @test basicTodo() {
    }
    @test addTodo() {
        this.store.dispatch(TodoActions.addTodo('Todo one!'));
        this.store.dispatch(TodoActions.addTodo('Todo two!'));
        this.store.dispatch(TodoActions.addTodo('Todo three!'));
        expect(this.store.getState()).to.have.property('todos').to.have.lengthOf(3);
    }
    @test toggleTodo() {
        this.store.dispatch(TodoActions.toggleTodo(0));
        expect(this.store.getState()).to.have.deep.property('todos[0].completed', true);
    }
    @test toggleUnTodo() {
        this.store.dispatch(TodoActions.toggleTodo(0));
        expect(this.store.getState()).to.have.deep.property('todos[0].completed', false)
    }
    @test defaultVisibilityFilter() {
        expect(this.store.getState()).to.have.deep.property('visibilityFilter', 'SHOW_ALL')
    }
    @test setVisibilityFilter() {
        this.store.dispatch(TodoActions.setVisibilityFilter(VisibilityFilters.SHOW_COMPLETED));
        expect(this.store.getState()).to.have.deep.property('visibilityFilter', VisibilityFilters.SHOW_COMPLETED);
    }
    @test unSubscribe() {
        this.store.dispatch(TodoActions.addTodo('Todo Four!'));
        this.unsubscribes();
        this.store.dispatch(TodoActions.addTodo('Todo Five!'));
        expect(this.store.getState()).to.have.deep.property('todos').length(5);
    }
    @skip @test testExtend() {
        var a = { a: 1, b: 2, c: 3, d: false };
        var b = extend({}, a, { a: 'a', d: true });
        expect(b).to.have.property('d', true);
    }
}

@suite('TodoFilter Test')
class TodoFilter {
    todo: any;
    before() {
        var example = { filter: 'SHOW_ALL', onFilterChange: (e) => { console.log(e.target.value) } }
        this.todo = mount(<Footer {...example}></Footer>);
        // var example ={text:'1',completed:false,onClick:()=>{}};
        // this.todo = shallow(<Todo {...example}></Todo>);
    }
    @test None() {
        var todo = this.todo;
        expect(todo.text()).to.have.string('SHOW_ALL SHOW_COMPLETED SHOW_ACTIVE');
    }
    @test DefaultCheck(){
        var todo = this.todo;
        expect(todo.find('span').filterWhere(a=>a.find('input').props().checked).text())
            .to.have.string('SHOW_ALL');
    }
    @test ChangeCheck(){
        var todo = this.todo;
        todo.find('span').filterWhere(a=>a.text()===' SHOW_COMPLETED').find('input').simulate('change');
        todo.setProps({filter:'SHOW_COMPLETED',onFilterChange:()=>{}});
        expect(todo.find('span').filterWhere(a=>a.find('input').props().checked).text())
            .to.have.string('SHOW_COMPLETED');
    }
    @skip @test InnerShallow(){
        var todo = this.todo;
        // shallow() function only work when Component loaded by shallow method
        // AND find target is created by React.createElment NOT anonymous function
        // http://airbnb.io/enzyme/docs/api/ShallowWrapper/shallow.html
        console.log(todo.find('Test').shallow().debug());
    }
}

// @suite('App Test')
// class AppTest{
//     app:any;
//     before(){
//         this.app = mount(<App></App>)
//     }
//     @test Default(){
//         var app = this.app;
//         // console.log(app.html());
//     }
//     @test is_Todo_2_Completed(){
//         var app = this.app;
//         // console.log(app.find('Todo').filterWhere(a=>a.find('li').text()==='Todo 2').props())
//         expect(app.find('Todo').filterWhere(a=>a.find('li').text()==='Todo 2').props().completed)
//             .to.be.true;
//     }
//     @test is_Filter_SHOWALL_Checked(){
//         var app = this.app;
//         // console.log(app.find('span').filterWhere(a=>(a.text()===' SHOW_ALL')).find('input').props().checked)
//         expect(app.find('span').filterWhere(a=>a.text()===' SHOW_ALL').find('input').props().checked)
//             .to.be.true;
//     }
// }