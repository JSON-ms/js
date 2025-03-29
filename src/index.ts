export function useJsonMs() {

  const state = {
    data: {},
    locale: null,
    settings: {},
  };

  const handler = {
    get(target: any, prop: string) {
      return target[prop];
    },
    set(target: any, prop: string, value: any) {
      target[prop] = value;
      return true;
    }
  }

  const proxy = new Proxy(state, handler);

  const getValueByPath = (obj: any, path: string): any => {
    const keys = path.split('.');
    let current = obj;
    for (const key of keys) {
      if (current && key in current) {
        current = current[key];
      } else {
        return undefined;
      }
    }
    return current;
  };

  const applyParams = (str: string, params?: { [key: string]: string | number }) => {
    if (!params) {
      return str;
    }
    const keys = Object.keys(params);
    keys.forEach(key => {
      str = str.replaceAll('{' + key + '}', params[key].toString());
    });
    return str;
  };

  const jms = (path: string, params?: { [key: string]: string | number }) => {
    return applyParams(getValueByPath(proxy.data, path), params);
  }

  const bindToEditor = (options: {
    targetOrigin?: string,
    onDataChange?: (data: any) => void,
    onLocaleChange?: (locale: string) => void,
    onSectionChange?: (section: string) => void,
  } = {}) => {

    options.targetOrigin = options.targetOrigin ?? '*';

    window.parent.postMessage({name: 'jsonms', type: 'init'}, options.targetOrigin);

    window.addEventListener('message', (event) => {
      if (event.data.name === 'jsonms') {
        switch (event.data.type) {
          case 'data':
            const data = JSON.parse(event.data.data);
            proxy.data = data.data;
            if (options.onDataChange) {
              options.onDataChange(data);
            }
            break;
          case 'section':
            if (options.onSectionChange) {
              options.onSectionChange(event.data.data);
            }
            break;
          case 'locale':
            if (options.onLocaleChange) {
              options.onLocaleChange(event.data.data);
            }
            break;
          case 'reload':
            window.location.reload();
            break;
        }
      }
    });
  }

  return {
    jms,
    bindToEditor,
    applyParams,
  }
}
