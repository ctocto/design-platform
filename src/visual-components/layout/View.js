import BaseView from '../base/';

export default class View extends BaseView {
  renderView() {
    return (
      <div>
        VC-Layout
        {this.props.children}
      </div>
    );
  }
}
