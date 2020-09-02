// pour les tests Jest ou Enzyme
/*
import React from 'react';

import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

import {NavigationsItems} from './NavigationsItems';
import {NavigationItem} from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

describe('<NavigationsItems/>', ()=>{
    let wrapper;
    beforeEach(()=>{
        wrapper = shallow(<NavigationsItems />);
    });
    it('descrption should two <NavagationsItems /> elements if not authenticated', ()=>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });

    it('descrption should two <NavagationsItems /> elements if authenticated', ()=>{
         wrapper.setProps({isAuthentificated: true});
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });

});*/