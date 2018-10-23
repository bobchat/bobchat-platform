import { IConnectionManager } from './../../common/dist/interfaces';
import * as pb from './../../common/dist/bobchat-proto';
import PbServiceProxy from './../../common/dist/PbServiceProxy';

export interface IServiceProxy {
  userService: pb.UserService;
  // emailService: pb.EmailService;
  // userProfileService: pb.UserProfileService;
  // walletService: pb.WalletService;
}

export function proxyProvider(conn: IConnectionManager): IServiceProxy {
  return {
    userService: new PbServiceProxy<pb.UserService>(conn, pb.UserService.name)
      .activate(pb.UserService),
    // emailService: new PbServiceProxy<pb.EmailService>(conn, pb.EmailService.name)
    //   .activate(pb.EmailService, true),
    // userProfileService: new PbServiceProxy<pb.UserProfileService>(conn, pb.UserProfileService.name)
    //   .activate(pb.UserProfileService),
    // walletService: new PbServiceProxy<pb.WalletService>(conn, pb.WalletService.name)
    //   .activate(pb.WalletService),
  };
}
