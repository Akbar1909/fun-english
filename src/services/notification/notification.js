import { toast } from 'react-toastify';
class ToastService {
  position = toast.POSITION.TOP_RIGHT;
  mode = 'success';
  autoClose = 2000;
  content = '';

  setPosition(position) {
    this.position = position;

    return this;
  }

  setMode(mode) {
    this.mode = mode;
    return this;
  }

  setAutoClose(autoClose) {
    this.autoClose = autoClose;

    return this;
  }

  setMessage(content) {
    this.content = content;
    return this;
  }

  get config() {
    return {
      autoClose: this.autoClose
    };
  }

  success() {
    toast.success(this.content, this.config);
  }

  error() {
    toast.error(this.content, this.config);
  }

  warn() {
    toast.warn(this.content, this.config);
  }

  pop() {
    this[this.mode]();

    this.reset();
  }

  reset() {
    this.position = toast.POSITION.TOP_RIGHT;
    this.mode = 'success';
    this.autoClose = 2000;
    this.content = '';
  }
}

const notification = new ToastService();

export default notification;
