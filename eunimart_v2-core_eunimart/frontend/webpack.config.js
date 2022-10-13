const HtmlWebPackPlugin = require("html-webpack-plugin");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const deps = require("./package.json").dependencies;
const webpack = require('webpack');

module.exports = {
  //entry: "./src/index",
  mode: "development",
  output: {
    publicPath: "https://frontend.eunimart.com/",
    //  publicPath: "http://localhost:4000/",
  },
  devtool: "source-map",
  resolve: {
    extensions: [".tsx", ".ts", ".jsx", ".js", ".json"],
  },

  devServer: {
    port: 4000,
    historyApiFallback: true,
  },

  module: {
    rules: [
      {
        test: /\.m?js/,
        type: "javascript/auto",
        resolve: {
          fullySpecified: false,
        },
      },
      {
        test: /\.(css|s[ac]ss)$/i,
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader',
            options: {
                presets: ['@babel/preset-react', '@babel/preset-env'],
                plugins: ['@babel/plugin-transform-runtime'],
            }
        }
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        use: [
          'file-loader',
          {
            loader: 'image-webpack-loader',
            options: {
              limit:10000,
              bypassOnDebug: true, // webpack@1.x
              disable: true, // webpack@2.x and newer
            },
          },
        ],
      },
      {
        test: /\.mp4$/,
        use: [
            {
                loader: "file-loader",
                options: {
                    name: "[name].[ext]",
                    outputPath: "video"
                }
            }
        ]
    }
    ],
  },

  plugins: [
    new ModuleFederationPlugin({
      name: "login_eunimart",
      filename: "remoteEntry.js",
      remotes: {

        Remote: `Remote@https://frontend.eunimart.com/remote/moduleEntry.js`,
        Cycle_Count: `Cycle_Count@https://frontend.eunimart.com/inventoryAdjustmentBuild/moduleEntry.js`,
        // DeliveryOrdersApp: `DeliveryOrdersApp@https://frontend.eunimart.com/Delivery_ordersBuild/moduleEntry.js`,
        SalesOrder: `SalesOrder@https://frontend.eunimart.com/sales_ordersBuild/remoteEntry.js`,
        purchase_orders: `purchase_orders@https://frontend.eunimart.com/Purchase_ordersBuild/moduleEntry.js`,
        pricing: `pricing@https://frontend.eunimart.com/pricingBuild/moduleEntry.js`,
        Products:`Products@https://frontend.eunimart.com/productsBuild/moduleEntry.js`,
        purchase_returns: `purchase_returns@https://frontend.eunimart.com/Purchase_returnsBuild/moduleEntry.js`,
        shippingOrders: `shippingOrders@https://frontend.eunimart.com/shippingOrdersBuild/remoteEntry.js`,
        AccessEngine:  `AccessEngine@https://frontend.eunimart.com/accessEngineBuild/remoteEntry.js`,
        AccessEngine1:  `AccessEngine@https://frontend.eunimart.com/accessEngineBuild/remoteEntry.js`,
        AccessEngine2:  `AccessEngine@https://frontend.eunimart.com/accessEngineBuild/remoteEntry.js`,
        accounting: `accounting@https://frontend.eunimart.com/accountingBuild/moduleEntry.js`,
        IST: `IST@https://frontend.eunimart.com/istBuild/moduleEntry.js`,
        ScrapOrders: `ScrapOrders@https://frontend.eunimart.com/Scrap_ordersBuild/remoteEntry.js`,
        SalesInvoice: `Purchase_Invoice@https://frontend.eunimart.com/InvoicingBuild/remoteEntry.js`,
        PurchaseInvoice: `Purchase_Invoice@https://frontend.eunimart.com/InvoicingBuild/remoteEntry.js`,
        contacts: `contacts@https://frontend.eunimart.com/ContactsBuild/remoteEntry.js`,
        Uom: `Uom@https://frontend.eunimart.com/uomBuild/moduleEntry.js`,
        ASN: `ASN@https://frontend.eunimart.com/ASNBuild/moduleEntry.js`,
        GRN: `GRN@https://frontend.eunimart.com/GRNBuild/moduleEntry.js`,
        locations_eunimart: `locations_eunimart@https://frontend.eunimart.com/locationsBuild/moduleEntry.js`,
        settings: `settings@https://frontend.eunimart.com/settingsBuild/moduleEntry.js`,
        UserProfileEunimart:`UserProfileEunimart@http://frontend.eunimart.com/profileBuild/moduleEntry.js`,
        SalesReturns: `SalesReturns@https://frontend.eunimart.com/saleReturnsBuild/moduleEntry.js`,
        Shipping_Orders: `Shipping_Orders@https://frontend.eunimart.com/ndr_wd_rto_Build/moduleEntry.js`,
        omnichannel_logistic_localwh: `omnichannel_logistic_localwh@https://frontend.eunimart.com/omnichannel_logistic_localwhBuild/moduleEntry.js`,
        omnichannel_virtualwh_retail: `omnichannel_virtualwh_retail@https://frontend.eunimart.com/omnichannel_virtualwh_retailBuild/moduleEntry.js`,
        omnichannel_web_marketplace: `omnichannel_web_marketplace@https://frontend.eunimart.com/omnichannel_web_marketplaceBuild/moduleEntry.js`,
        omnichannel_accounting_pos: `omnichannel_accounting_pos@https://frontend.eunimart.com/omniAccountingPosBuild/moduleEntry.js`,

    



        // Remote: `Remote@https://frontend.eunimart.com/remote/moduleEntry.js`,
        // DeliveryOrdersApp: `DeliveryOrdersApp@http://frontend.eunimart.com:4019/moduleEntry.js`,
        // locations_eunimart: `locations_eunimart@http://frontend.eunimart.com:4023/moduleEntry.js`,
        // SalesOrder: `SalesOrder@http://frontend.eunimart.com:4008/remoteEntry.js`,
        // shippingOrders: `shippingOrders@http://frontend.eunimart.com:4013/remoteEntry.js`,
        // AccessEngine: `AccessEngine@http://frontend.eunimart.com:4027/remoteEntry.js`,
        // AccessEngine1: `AccessEngine@http://frontend.eunimart.com:4027/remoteEntry.js`,
        // AccessEngine2: `AccessEngine@http://frontend.eunimart.com:4027/remoteEntry.js`,
        // Cycle_Count: `Cycle_Count@http://frontend.eunimart.com:4018/moduleEntry.js`,
        // purchase_orders: `purchase_orders@http://frontend.eunimart.com:4020/moduleEntry.js`,
        // pricing: `pricing@http://frontend.eunimart.com:4003/moduleEntry.js`,
        // purchase_returns: `purchase_returns@http://frontend.eunimart.com:4011/moduleEntry.js`,
        // Products:`Products@http://frontend.eunimart.com:4021/moduleEntry.js`,
        // accounting: `accounting@http://frontend.eunimart.com:4010/moduleEntry.js`,
        // IST: `IST@http://frontend.eunimart.com:4009/moduleEntry.js`,
        // ScrapOrders: `ScrapOrders@http://frontend.eunimart.com:4002/remoteEntry.js`,
        // SalesInvoice: `Purchase_Invoice@http://frontend.eunimart.com:4024/remoteEntry.js`,
        // PurchaseInvoice: `Purchase_Invoice@http://frontend.eunimart.com:4024/remoteEntry.js`,
        // contacts: `contacts@http://frontend.eunimart.com:4022/remoteEntry.js`,
        // Uom: `Uom@http://frontend.eunimart.com:4001/moduleEntry.js`,
        // ASN: `ASN@http://frontend.eunimart.com:4006/moduleEntry.js`,
        // // GRN: `GRN@http://frontend.eunimart.com:4007/moduleEntry.js`,
        // settings: `settings@http://frontend.eunimart.com:4005/moduleEntry.js`,
        // UserProfileEunimart:`UserProfileEunimart@http://frontend.eunimart.com:4028/moduleEntry.js`,
        // SalesReturns: `SalesReturns@http://frontend.eunimart.com:4012/moduleEntry.js`,
        // Shipping_Orders: `Shipping_Orders@http://frontend.eunimart.com:4014/moduleEntry.js`,
      },
      exposes: {},
      shared: deps
    }), 
    new HtmlWebPackPlugin({
      template: "./src/index.html",
  }),
  new webpack.DefinePlugin({
    'process.env.BACKEND_API_URL': JSON.stringify(process.env.BACKEND_API_URL)
  })
  ],
};
