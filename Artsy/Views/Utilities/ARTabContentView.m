#import "ARTabContentView.h"

#import "ARDispatchManager.h"
#import "ARNavigationController.h"
#import "UIView+HitTestExpansion.h"
#import "ARMenuAwareViewController.h"
#import "AROptions.h"
#import "ARSwitchBoard.h"
#import "ArtsyEcho.h"

#import <ObjectiveSugar/ObjectiveSugar.h>

static BOOL ARTabViewDirectionLeft = NO;
static BOOL ARTabViewDirectionRight = YES;


@interface ARTabContentView ()
@end


@implementation ARTabContentView

- (id)initWithFrame:(CGRect)frame hostViewController:(UIViewController *)controller delegate:(id<ARTabViewDelegate>)delegate dataSource:(ARTopMenuNavigationDataSource *)dataSource
{
    self = [super initWithFrame:frame];
    if (!self) return nil;

    self.autoresizingMask = UIViewAutoresizingFlexibleWidth | UIViewAutoresizingFlexibleHeight;
    self.opaque = YES;
    self.clipsToBounds = YES;

    _hostViewController = controller;
    _delegate = delegate;
    _dataSource = dataSource;

    return self;
}

- (void)removeFromSuperview
{
    [_currentNavigationController willMoveToParentViewController:nil];
    [_currentNavigationController removeFromParentViewController];

    [super removeFromSuperview];
}


#pragma mark -
#pragma mark Setting the Current View Index

- (void)setCurrentTab:(ARTopTabControllerTabType)tabType animated:(BOOL)animated
{
    if ([self.delegate respondsToSelector:@selector(tabContentView:shouldChangeToTab:)]) {
        if ([self.delegate tabContentView:self shouldChangeToTab:tabType] == NO) return;
    }

    [self forceSetCurrentTab:tabType animated:animated];
}


- (void)forceSetCurrentTab:(ARTopTabControllerTabType)tabType animated:(BOOL)animated
{
    BOOL isARNavigationController = [self.currentNavigationController isKindOfClass:ARNavigationController.class];

    // Setup positions of views
    CGRect nextViewInitialFrame = self.bounds;
    CGRect oldViewEndFrame = self.bounds;

    __block UINavigationController *oldViewController = self.currentNavigationController;

    // Ensure there is only one scrollview that has `scrollsToTop`
    if (isARNavigationController) {
      UIViewController<ARMenuAwareViewController> *oldTopViewController = (id)oldViewController.topViewController;
      if ([oldTopViewController respondsToSelector:@selector(menuAwareScrollView)]) {
          oldTopViewController.menuAwareScrollView.scrollsToTop = NO;
      }
    }

    // Get the next View Controller, add to self
    _currentNavigationController = [self.dataSource navigationControllerForTabType:tabType];
    self.currentNavigationController.view.frame = nextViewInitialFrame;

    if (!self.currentNavigationController.parentViewController) {
        // Add the new ViewController our view's host
        [self.currentNavigationController willMoveToParentViewController:self.hostViewController];
        [self.hostViewController addChildViewController:self.currentNavigationController];
        [self.currentNavigationController didMoveToParentViewController:_hostViewController];
    }

    void (^animationBlock)(void);
    animationBlock = ^{
        self.currentNavigationController.view.frame = self.bounds;
        oldViewController.view.frame = oldViewEndFrame;
    };

    void (^completionBlock)(BOOL finished);
    completionBlock = ^(BOOL finished) {
        if ([self.delegate respondsToSelector:@selector(tabContentView:didChangeToTab:)]) {
            [self.delegate tabContentView:self didChangeToTab:tabType];
        }
    };

    ar_dispatch_main_queue(^{
        if (animated && oldViewController && oldViewController.parentViewController) {
            [self.hostViewController transitionFromViewController:oldViewController toViewController:self.currentNavigationController duration:0.3 options:0 animations:animationBlock completion:completionBlock];
        } else {
            [oldViewController beginAppearanceTransition:NO animated:NO];
            [oldViewController endAppearanceTransition];
            [self.currentNavigationController beginAppearanceTransition:YES animated:NO];
            [self addSubview:self.currentNavigationController.view];
            [self.currentNavigationController endAppearanceTransition];

            // Ensure there is only one scrollview that has `scrollsToTop`
            if (isARNavigationController && [self.currentNavigationController.topViewController conformsToProtocol:@protocol(ARMenuAwareViewController)] && [self.currentNavigationController.topViewController respondsToSelector:@selector(menuAwareScrollView)]) {
                [(id)self.currentNavigationController.topViewController menuAwareScrollView].scrollsToTop = YES;
            }

            animationBlock();
            completionBlock(YES);
        }
    });
}


@end
