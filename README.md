## Installation

##### Thêm Vào package.json
```
"my-rn-setting": "git+https://gitlab.com/react-native-my-libs/my-rn-setting.git",
```

### Cách sử dụng

##### SettingScreen
Setting Screen Với Header Back

##### ListSettingComponent
không có header

```javascript

export class AppSettingsUtils {
    
    private static async _loadListSettingItemAsync(): Promise<SettingItemObj[]> {
        let result: SettingItemObj[] = [];
        result.push({rowAccountSetting: {IAP_LICENSE_KEY: Keys.IAP_LICENSE_KEY, callbackDongBoSuccess: HomeScreen.refreshContent}});
        result.push({rowContact: {LINK_CONSTRACT: Keys.LINK_CONSTRACT}});
        result.push({isSession: true});
        result.push({
            title: getStrings().Enable_snapping, des: getStrings().Enable_snapping_msg,
            switchSetting: {
                switchState: UserSettingValue.isEnableSnap,
                switchOnValueChange: UserSettingValue.setEnableSnap
            }
        });

        result.push({
            title: getStrings().large_font_size, des: getStrings().increase_font_size,
            switchSetting: {
                switchState: UserSettingValue.isLargeFont,
                switchOnValueChange: UserSettingValue.setLargeFont
            }
        });
        result.push({isSession: true, title: getStrings().Other.toUpperCase()});
        result.push({
            title: getStrings().share_app,
            onPress: () => {
                let url = isIOS() ? ("https://itunes.apple.com/app/id" + Keys.iosId + "#") : ("https://play.google.com/store/apps/details?id=" + Keys.androidID);
                Share.share({
                    message: url + '\n' + getStrings().msg_share,
                    url: url,
                    title: Keys.getLEFT_MENU_ADS_CATE()
                })
            }
        });
        result.push({
            title: getStrings().review_title,
            onPress: () => {
                DialogUtils.showRatePage(Keys.androidID, Keys.iosId);
            }
        });
        result.push({
            title: "Privacy policy",
            onPress: () => {
                Linking.openURL(Keys.LINK_PRIVACY)
                    .catch(err => console.error('An error occurred', err))
            }
        });

        return result;
    }

    public static openScreenSettingScreen() {
        let props: SettingScreenProps = {
            headerColors: headerColors,
            LINK_CONSTRACT: Keys.LINK_CONSTRACT,
            UserUtils: UserUtils,
            loadListSettingItemAsync: AppSettingsUtils._loadListSettingItemAsync
        };
        CommonUtils.openScreen("SettingScreen", props);
    }
}

```
