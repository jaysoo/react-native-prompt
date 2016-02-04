const React = require('react-native');
const {
  Modal,
  Platform,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} = React;
const Portal = require('react-native/Libraries/Portal/Portal');
const styles = require('./styles');

const Prompt = React.createClass({
  propTypes: {
    title: React.PropTypes.string.isRequired,
    visible: React.PropTypes.bool,
    defaultValue: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    onCancel: React.PropTypes.func.isRequired,
    cancelText: React.PropTypes.string,
    onSubmit: React.PropTypes.func.isRequired,
    submitText: React.PropTypes.string,
    onChangeText: React.PropTypes.func.isRequired,
    borderColor: React.PropTypes.string,
    promptStyle: React.PropTypes.object,
    titleStyle: React.PropTypes.object,
    buttonStyle: React.PropTypes.object,
    buttonTextStyle: React.PropTypes.object,
    inputStyle: React.PropTypes.object
  },
  getDefaultProps() {
    return  {
      visible: false,
      defaultValue: '',
      cancelText: 'Cancel',
      submitText: 'OK',
      borderColor:'#ccc',
      promptStyle: {},
      titleStyle: {},
      buttonStyle: {},
      buttonTextStyle: {},
      inputStyle: {},
      onChangeText: () => {}
    };
  },
  getInitialState() {
    return { value: this.props.defaultValue };
  },
  componentWillMount() {
    this._tag = '';
    if (Platform.OS === 'android') {
      this._tag = Portal.allocateTag();
    }
  },
  componentDidMount() {
    if (Platform.OS === 'android') {
      this._showOrCloseModal(this.props.visible);
    }
  },
  componentWillUnmount() {
    if (Platform.OS === 'android') {
      Portal.closeModal(this._tag);
      this._tag = '';
    }
  },
  componentWillReceiveProps(nextProps) {
    if (nextProps.visible !== this.props.visible) {
      this._showOrCloseModal(nextProps.visible);
    }
  },
  _showOrCloseModal(visible) {
    if (visible) {
      this.setState({ value: this.props.defaultValue });
    }

    if (Platform.OS === 'ios') {
      return;
    }

    if (visible) {
      Portal.showModal(this._tag, this._renderDialog());
    } else {
      Portal.closeModal(this._tag);
    }
  },
  _onChangeText(value) {
    this.setState({ value });
    this.props.onChangeText(value);
  },
  _onSubmitPress() {
    const { value } = this.state;
    if (value) {
      this.props.onSubmit(value);
    }
  },
  _onCancelPress() {
    this.props.onCancel();
  },
  _renderDialog() {
    const {
      title,
      placeholder,
      defaultValue,
      cancelText,
      submitText,
      borderColor,
      promptStyle,
      titleStyle,
      buttonStyle,
      buttonTextStyle,
      inputStyle
    } = this.props;
    return (
      <View style={styles.dialog} key="prompt">
        <View style={styles.dialogOverlay}/>
        <View style={[styles.dialogContent, { borderColor }, promptStyle]}>
          <View style={[styles.dialogTitle, { borderColor }]}>
            <Text style={[styles.dialogTitleText, titleStyle]}>
              { title }
            </Text>
          </View>
          <View style={styles.dialogBody}>
            <TextInput
              style={[styles.dialogInput, inputStyle]}
              defaultValue={defaultValue}
              onChangeText={this._onChangeText}
              placeholder={placeholder}
              autoFocus={true}
              underlineColorAndroid="white"/>
          </View>
          <View style={[styles.dialogFooter, { borderColor }]}>
            <TouchableWithoutFeedback onPress={this._onCancelPress}>
              <View style={[styles.dialogAction, buttonStyle]}>
                <Text style={[styles.dialogActionText, buttonTextStyle]}>
                  {cancelText}
                </Text>
              </View>
            </TouchableWithoutFeedback>
            <TouchableWithoutFeedback onPress={this._onSubmitPress}>
              <View style={[styles.dialogAction, buttonStyle]}>
                <Text style={[styles.dialogActionText, buttonTextStyle]}>
                  {submitText}
                </Text>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </View>
      </View>
    );
  },
  render() {
    if (Platform.OS === 'ios') {
      return (
        <Modal transparent={true} visible={this.props.visible}>
          {this._renderDialog()}
        </Modal>
      );
    } else {
      return <View/>;
    }
  }
});

module.exports = Prompt;
