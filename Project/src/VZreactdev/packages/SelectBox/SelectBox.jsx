import React, { Component } from 'react';
import Select, {components} from 'react-select';

import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import * as actions from "./actions";
import { ICONS } from 'vz-odt-components/Icon/Icon-assets';
import Icon from 'vz-odt-components/Icon/Icon';
import './SelectBox.css';

class SelectBox extends Component{
    constructor(props){
        super(props);
        this.menuPlacementPos="bottom";
        this.onSelectFocus=this.onSelectFocus.bind(this);
    }


onSelectFocus(){
    var spaceHeight=(document.getElementsByClassName('form-group').length !==0)?document.getElementsByClassName('form-group')[0].getBoundingClientRect().bottom:0;
        this.menuPlacementPos="bottom";
};

getActiveDescendentId(){
    
    const { menuOptions, focusedOption } = (this.reselect)?this.reselect.select.state:'';

    if (!focusedOption) return undefined;
    
    var groupOption;
    if(this.reselect && this.reselect.select && this.reselect.select.hasGroups && menuOptions.render.length != 0){
      menuOptions.render.map(function(item){
        if(!groupOption){
          item.options.map(function(option){
            if(option.value==focusedOption.value){
                groupOption=option;
                return groupOption; 
            }
          });
        }
      });
      
      return groupOption && groupOption.key;
      
    }else{
      const index = menuOptions.focusable.indexOf(focusedOption);
      const option = menuOptions.render[index];
      
      return option && option.key;
    }
  };
render(){
    const groupStyles={
        display:'flex',
        borderBottom: '1px solid #D8DADA',
        border:0
    };

    const formatGroupLabel = data => (
    <div style={groupStyles}>
        <span>{data.label}</span> 
    </div>
    );
    const DropdownIndicator =()=>{
        return(
            <Icon
                        icon={ICONS.CHEVRON_DOWN}
                        className="vz-odt-selectbox-chevron-icon"
                        />
        )
    };
    const customStyles = {
        option: (base, { data, isDisabled, isFocused, isSelected }) => ({
            ...base,
            borderBottom: '1px solid #D8DADA',
            fontFamily: 'NHaasGroteskDSStd-75Bd',
            fontSize: '1.5rem',
            backgroundColor:'transparent',
            color: (isFocused)?'#000':(isDisabled)?'#D8DADA':'#747676',
            padding: 10,
            cursor:(isDisabled)?'default':'pointer'
        }),
        input:(base,state)=>({
            ...base,
            color:'transparent'
        }),
        control:(base,state)=>({
            ...base,
            borderRadius: 0,
            border: 0,
            fontFamily: 'NHaasGroteskDSStd-75Bd',
            color: '#000',
            fontSize: '2rem',
            width: '100%',
            marginLeft:0,
            marginBottom:'1rem',
            cursor:'pointer',
            boxShadow:'none',
            outline:(state.isFocused)?'#000000 dotted 1px':'none',
            backgroundColor:'transparent'
        }),
        valueContainer:(base,state)=>({
            ...base,
            marginLeft:0,
            paddingLeft:0
        }),
        menuList:(base,state)=>({
            ...base,
            maxHeight:"none"
        }),
        group:(base,state)=>({
            ...base,
            padding:0
        }),
        groupHeading:(base,data)=>({
            fontFamily: 'NHaasGroteskDSStd-75Bd',
            fontSize: '1.5rem',
            backgroundColor:'transparent',
            color:'#D8DADA',
            borderBottom: '1px solid #D8DADA',
            padding:10
        }),
        indicatorSeparator :()=>{
            return false;
        },
        menu:(base,state)=>({
            ...base,
            border:'1px solid #000',
            borderRadius:0,
            marginTop:'1rem',
            bottom:(this.menuPlacementPos=="top")?'100%':undefined,
            top:(this.menuPlacementPos=="bottom")?'100%':undefined
        }),
        singleValue: (base, state) => {
            const opacity = state.isDisabled ? 0.5 : 1;
            const transition = 'opacity 300ms';
            const padding=0;
            const marginLeft=0;
            const maxWidth='initial';

            return { ...base, opacity, transition, padding, marginLeft, maxWidth };
        }
    };
    
    
    const Input = (props,state) => {
        const { selectValue } = (this.reselect)?this.reselect.select.state:'';
        var customProps={
            cx:props.cx,
            getStyles:props.getStyles,
            id:props.id,
            innerRef:props.innerRef,
            autoCapitalize:props.autoCapitalize,
            'aria-autocomplete':props['aria-autocomplete'],
            'aria-busy':props['aria-busy'],
            'aria-owns':props['aria-owns'],
            'aria-expanded':props['aria-expanded'],
            'aria-haspopup':props['aria-haspopup'],
            value:props.value,
            spellCheck:props.spellCheck,
            tabIndex:props.tabIndex,
            type:props.type,
            onBlur:props.onBlur,
            onFocus:props.onFocus,
            onChange:props.onChange,
            'aria-activedescendant':this.getActiveDescendentId(),
            'aria-label':(selectValue)?selectValue[0].label:'',
            role:"combobox"
        };
  return ( 
        <components.Input  {...customProps} 
        />   
  );
  
};

return(
    <Select
                styles={customStyles}
                options={this.props.selctBoxOptions}
                defaultValue={this.props.defaultOption}
                formatGroupLabel={formatGroupLabel}
                components={{ DropdownIndicator,Input }}
                
                onChange={(val)=>{this.props.onChangeFn(val.value)}}
                captureMenuScroll={true}
                onFocus={()=>{this.onSelectFocus()}}
                ref={(val)=>{this.reselect=val;}}
                aria-label={this.props.defaultOption.label} 
                blurInputOnSelect={false}  
                menuShouldScrollIntoView={false}  
            />
    );

}
}
const mapStateToProps = state => {
  return {
    selectbox: state.selectBox
  };
};
const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(actions, dispatch)
});
export default connect(mapStateToProps,mapDispatchToProps)(SelectBox);