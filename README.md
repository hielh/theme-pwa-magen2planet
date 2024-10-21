# Magento 2 with Venia PWA

![Magento Version](https://img.shields.io/badge/Magento-2.4.7--p2-blue)
![PWA Studio](https://img.shields.io/badge/PWA%20Studio-latest-brightgreen)
![License](https://img.shields.io/badge/license-MIT-green)

A comprehensive guide for installing and configuring Magento 2 with the Venia PWA storefront. This setup provides a modern, progressive web application experience for your Magento store.

## ✨ Features

- Complete Magento 2 installation
- Venia PWA storefront integration
- Sample data deployment
- Elasticsearch integration (with MySQL fallback option)
- UPWARD connector configuration
- Development and production build setup

## 🚀 Quick Start

### Prerequisites

- PHP 7.4 or higher
- MySQL 5.7 or higher
- Node.js 18.12.0
- Yarn 1.22.19
- Composer
- Git

### Environment Setup

1. **Install Yarn globally**
```bash
npm install -g yarn@1.22.19
```

2. **Create project directory**
```bash
mkdir magento-pwa
cd magento-pwa
```

## 📦 Installation

### 1. Magento 2 Setup

#### Linux Installation with Devilbox

1. **Clone Magento repository**
```bash
git clone https://github.com/magento/magento2
cd magento2
git checkout 2.4.7-p2
```

2. **Install dependencies**
```bash
composer install
```

3. **Create symbolic link**
```bash
cd ..
ln -s magento2/ htdocs
```

4. **Configure Magento**
```bash
php bin/magento setup:install \
--base-url="http://magento-pwa.loc/" \
--db-host="mysql" \
--db-name="newvenia" \
--db-user="root" \
--db-password="" \
--admin-firstname="admin" \
--admin-lastname="admin" \
--admin-email="user@example.com" \
--admin-user="admin" \
--admin-password="Admin@123456" \
--language="en_US" \
--currency="USD" \
--timezone="America/Chicago" \
--use-rewrites="1" \
--backend-frontname="admin" \
--search-engine=elasticsearch7 \
--elasticsearch-host="elastic" \
--elasticsearch-port=9200
```

> **Note 1**: if you incouter any problems with this command, you can use keys of magento account. Register in this account "https://repo.magento.com", then you can get
	your keys here "https://commercemarketplace.adobe.com/customer/accessKeys/"

> **Note 2**: For Windows installation, Follow the guide at [The Coach SMB.](https://www.thecoachsmb.com/100-working-step-by-step-guide-to-install-magento-2-4-4-on-windows/).


### 2. Search Engine Setup

#### Option 1: Elasticsearch (Recommended)
- Ensure Elasticsearch 7.x is installed and running
- Configuration is included in the Magento setup command above

#### Option 2: MySQL Search (Alternative)
```bash
composer require swissup/module-search-mysql-legacy
```

### 3. Sample Data & System Setup

```bash
# Deploy sample data
php bin/magento sampledata:deploy

# System setup
php bin/magento indexer:reindex
php bin/magento setup:upgrade
php bin/magento setup:di:compile
php bin/magento cache:flush
```

### 4. PWA Studio Installation

> **Note**: install connector, to replace the default theme with venia store front you created: https://github.com/swissup/module-upward-connector?tab=readme-ov-file#installation  ,   also use -W for composer require, if you encoutered any problems, or --ignore-platform-reqs.
1. **Install UPWARD connector**
```bash
composer require swissup/module-upward-connector -W
```

2. **Configure backend URL**
Add to `~/public_html/pub/.htaccess`:
```apache
SetEnv MAGENTO_BACKEND_URL https://your-backend-url.com
```

3. **Create PWA Studio project**
```bash
yarn create @magento/pwa
```

4. **Project Configuration Prompts**
- Project directory: `Theme-Venia`
- Package name: `venia`
- Template: `@magento/venia-concept`
- Magento instance URL: `[Your Magento URL]`
- Edition: `Magento Open Source (MOS)`

5. **Build and Deploy**
```bash
cd Theme-Venia
yarn run build

# Deploy to Magento
cp -r dist/* [magento-root]/pub/pwa/
```

## 🔧 Final Configuration

```bash
bin/magento setup:upgrade
bin/magento setup:di:compile
bin/magento config:set web/upward/path pwa/upward.yml
bin/magento cache:flush
```

## 🌟 Accessing Your Store

Visit your Magento URL to see your new PWA storefront in action!

## 🔍 Troubleshooting

- **Elasticsearch Issues**: Verify Elasticsearch is running with `curl localhost:9200`
- **Build Errors**: Ensure Node.js version compatibility
- **404 Errors**: Check your MAGENTO_BACKEND_URL configuration

## 📚 Additional Resources

- [Official Magento Documentation](https://devdocs.magento.com/)
- [PWA Studio Documentation](https://magento.github.io/pwa-studio/)
- [Venia Storefront Documentation](https://magento.github.io/pwa-studio/venia-pwa-concept/)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 💬 Support

For support, please visit the [Magento Community Forums](https://community.magento.com/) or [Stack Overflow](https://stackoverflow.com/questions/tagged/magento2).
