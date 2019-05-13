import React, {Component} from 'react'
import {CheckBox, FlatListCustom, PopupDialog, StyleUtils, TextCustom} from "my-rn-base-component";
import {ViewProps, StyleSheet} from "react-native";

const s = StyleUtils.getAllStyle();

interface Props extends ViewProps {
    listData: any[]
    selectedValue: string | number
    selectedCallback: (value: any) => void
}

export class DialogSelectValue extends Component<Props> {
    private popupDialog: any;

    constructor(props) {
        super(props);
        this.state = {}
    }

    show(onShowed?) {
        this.popupDialog.show()
    }

    dismiss(onDismissed?) {
        this.popupDialog.dismiss()
    }

    onClickRadio(item) {
        this.props.selectedCallback && this.props.selectedCallback(item);
        this.dismiss()
    }

    _renderItem(info) {
        let item = info.item;
        let des = item.toString ? item.toString() : String(item);
        return <CheckBox
            radio isReadOnly
            isChecked={item === this.props.selectedValue}
            rightTextView={<TextCustom value={des} style={[s.f_lar, s.black, {marginLeft: 10}]}/>}
            style={{paddingTop: 8, paddingBottom: 8, marginLeft: 3}}
            onClick={() => {this.onClickRadio(item)}}/>
    }

    render() {
        return (
            <PopupDialog
                width={"85%"} height={"70%"}
                ref={(popupDialog) => { this.popupDialog = popupDialog }}>
                <FlatListCustom style={styles.listContainer}
                                renderItem={this._renderItem.bind(this)}
                                data={this.props.listData}/>
            </PopupDialog>
        )
    }
}

const styles = StyleSheet.create({
    listContainer: {flex: 1, margin: 8}
});
