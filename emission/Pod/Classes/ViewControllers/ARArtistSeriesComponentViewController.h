#import <Emission/ARComponentViewController.h>

NS_ASSUME_NONNULL_BEGIN

@interface ARArtistSeriesComponentViewController : ARComponentViewController

@property (nonatomic, strong, readonly) NSString *artistSeriesID;

- (instancetype)init NS_DESIGNATED_INITIALIZER;


- (instancetype)initWithArtistSeriesID:(nullable NSString *)artistSeriesID;
- (instancetype)initWithArtistSeriesID:(nullable NSString *)artistSeriesID
                            emission:(nullable AREmission*)emission NS_DESIGNATED_INITIALIZER;

- (instancetype)initWithEmission:(nullable AREmission *)emission
                      moduleName:(NSString *)moduleName
               initialProperties:(nullable NSDictionary *)initialProperties NS_UNAVAILABLE;

@end

NS_ASSUME_NONNULL_END
